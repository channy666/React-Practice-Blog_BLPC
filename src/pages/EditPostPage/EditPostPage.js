import styled from "styled-components";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SideBar from "../../component/SideBar";
import { GeneralBlock } from "../../component/Blocks";
import { AuthContext } from "../../context";
import { updatePost, getPost } from "../../WebAPI";
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
  const oldPostDataRef = useRef();
  const { id } = useParams();
  const scrollIntoViewRef = useRef();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [sort, setSort] = useState("");
  const [content, setContent] = useState("");
  const { user, setUser, isConfirmingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConfirmingUser) return;
    if (!getAuthToken() || !user) {
      setUser(null);
      setAuthToken("");
      navigate("/");
    }
  }, [user, isConfirmingUser]);

  useEffect(() => {
    if (isConfirmingUser) return;
    getPost(id).then((data) => {
      if (data.user.id !== user.id) {
        setErrorMessage("您沒有編輯文章的權限！");
        return;
      }

      setTitle(data.title);
      setSort(`${data.category}/${data.classification}`);
      setContent(data.body);
      oldPostDataRef.current = data;
    });
  }, [isConfirmingUser, id, user.id]);

  const handleSubmitUpdatePost = () => {
    setErrorMessage(null);

    if (!title || !editorDataRef.current.getData() || !sort) {
      setErrorMessage("標題、分類與內文皆不可為空");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    const postSort = sort.split("/");
    const { createdAt, userId } = oldPostDataRef.current;
    const newPostData = {
      title,
      body: content,
      category: postSort[0],
      classification: postSort[1],
      userId,
      createdAt,
    };

    if (userId !== user.id) {
      setErrorMessage("您沒有編輯文章的權限！");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    updatePost(id, newPostData)
      .then((data) => {
        if (data.id) {
          if (data.category === "Forum") {
            return navigate(`/Forum/${data.id}`);
          }
          navigate(`/Post/${data.id}`);
        }
      })
      .catch((err) => {
        setErrorMessage("伺服器錯誤，請稍後再試");
        scrollIntoViewRef.current.scrollIntoView();
      });
  };

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setErrorMessage(false);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSort(e.target.value);
  }, []);

  const handleContentChange = (event, editor) => {
    setContent(editor.getData());
  };

  return (
    <Root>
      <SideBar />
      <CreatePostContainer>
        <GeneralBlock title="更新文章" titleWidth="160px">
          <CreatePost ref={scrollIntoViewRef}>
            <PostTitle>
              <input
                placeholder=" 請輸入文章標題"
                onChange={handleTitleChange}
                value={title}
                onFocus={handleFocus}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </PostTitle>
            <PostCatagory>
              <select onChange={handleCategoryChange} value={sort}>
                <option value="Research/FinTech">{`研究觀點 > 金融科技`}</option>
                <option value="Research/General">{`研究觀點 > 一般產業`}</option>
                <option value="Analysis/FinTech">{`要文評析 > 金融科技`}</option>
                <option value="Analysis/General">{`要文評析 > 一般產業`}</option>
                <option value="Forum/PhD">{`公眾論壇 > 博士生論壇`}</option>
                <option value="Forum/News">{`公眾論壇 > 要聞共賞`}</option>
              </select>
            </PostCatagory>
            <CKEditorContainer>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                config={{ placeholder: "請輸入文章內容" }}
                onReady={(editor) => {
                  editorDataRef.current = editor;
                }}
                onFocus={handleFocus}
                onChange={handleContentChange}
              />
            </CKEditorContainer>
            <SubmitButton onClick={handleSubmitUpdatePost}>發布</SubmitButton>
          </CreatePost>
        </GeneralBlock>
      </CreatePostContainer>
    </Root>
  );
}

export default CreatePostPage;
