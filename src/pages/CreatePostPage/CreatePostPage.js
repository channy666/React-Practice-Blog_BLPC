import styled from "styled-components";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SideBar from "../../component/SideBar";
import { GeneralBlock } from "../../component/Blocks";
import { AuthContext } from "../../context";
import { createPost } from "../../WebAPI";
import { getAuthToken, setAuthToken } from "../../utils/authorization";

const Root = styled.div`
  padding: 30px 0px 0px 7%;
  display: flex;
`;

const CreatePostContainer = styled.div`
  width: 72%;
  margin-bottom: 60px;
`;

const CreatePost = styled.div`
  padding: 40px 5% 30px 7%;
  width: 90%;
`;

const PostTitle = styled.div`
  width: 90%;
  height: 35px;
  margin-bottom: 45px;

  input {
    height: 100%;
    width: 100%;
    font-size: 16px;

    ::placeholder {
      color: #757575;
    }
  }
`;

const PostCatagory = styled.div`
  margin-bottom: 30px;

  select {
    height: 40px;
    font-size: 16px;
    color: #757575;

    option:not(first-child) {
      color: black;
    }
  }
`;

const SubmitButton = styled.div`
  display: flex;
  margin: 20px 0px 0px 84%;
  background: #9c7391;
  color: white;
  border-radius: 3px;
  padding: 12px 0px 12px 5px;
  width: 10%;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 8px;
  font-weight: bold;

  :hover {
    background: #301945;
  }
`;

const CKEditorContainer = styled.div`
  width: 58vw;
  .ck-editor {
    .ck-editor__main {
      .ck-content {
        height: 600px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: Red;
  margin: 8px 0px 0px 7px;
  font-weight: bold;
`;

function CreatePostPage() {
  const editorDataRef = useRef();
  const scrollIntoViewRef = useRef();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [sort, setSort] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken() || !user) {
      setUser(null);
      setAuthToken("");
      navigate("/");
    }
  }, [user]);

  const handleSubmitPost = () => {
    setErrorMessage(null);
    if (!title || !editorDataRef.current.getData() || !sort) {
      setErrorMessage("???????????????????????????????????????");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    const postData = {
      title,
      body: editorDataRef.current.getData(),
      category: sort[0],
      classification: sort[1],
    };

    createPost(postData)
      .then((data) => {
        if (data.ok === 0) {
          setErrorMessage(data.message);
          scrollIntoViewRef.current.scrollIntoView();
          // `code: 2` ?????????????????????????????????
          if (data.code === 2) {
            setUser(null);
            setAuthToken("");
            navigate("/");
          }
          return;
        }
        if (data.id) {
          if (data.category === "Forum") {
            return navigate(`/Forum/${data.id}`);
          }
          navigate(`/Post/${data.id}`);
        }
      })
      .catch((err) => {
        setErrorMessage("?????????????????????????????????");
        scrollIntoViewRef.current.scrollIntoView();
      });
  };

  const handlePostTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setErrorMessage(false);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSort(e.target.value.split("/"));
  }, []);

  return (
    <Root>
      <SideBar />
      <CreatePostContainer>
        <GeneralBlock title="????????????" titleWidth="160px">
          <CreatePost ref={scrollIntoViewRef}>
            <PostTitle>
              <input
                placeholder=" ?????????????????????"
                onChange={handlePostTitle}
                value={title}
                onFocus={handleFocus}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </PostTitle>
            <PostCatagory>
              <select onChange={handleCategoryChange}>
                <option value="" selected disabled hidden>
                  ?????????????????????
                </option>
                <option value="Research/FinTech">{`???????????? > ????????????`}</option>
                <option value="Research/General">{`???????????? > ????????????`}</option>
                <option value="Analysis/FinTech">{`???????????? > ????????????`}</option>
                <option value="Analysis/General">{`???????????? > ????????????`}</option>
                <option value="Forum/PhD">{`???????????? > ???????????????`}</option>
                <option value="Forum/News">{`???????????? > ????????????`}</option>
              </select>
            </PostCatagory>
            <CKEditorContainer>
              <CKEditor
                editor={ClassicEditor}
                data={""}
                config={{ placeholder: "?????????????????????" }}
                onReady={(editor) => {
                  editorDataRef.current = editor;
                }}
                onFocus={handleFocus}
              />
            </CKEditorContainer>
            <SubmitButton onClick={handleSubmitPost}>??????</SubmitButton>
          </CreatePost>
        </GeneralBlock>
      </CreatePostContainer>
    </Root>
  );
}

export default CreatePostPage;
