import styled from "styled-components";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/authorization";
import { getMe, deletePost } from "../WebAPI";

const EditPost = styled.div`
  display: flex;
  justify-content: center;
`;

const UpdatePost = styled.div`
  display: flex;
  height: 40px;
  width: 30%;
  cursor: pointer;
  align-items: center;
  color: #9e9e9f;
  justify-content: center;
  border: 2px dashed #9e9e9f;
  margin-right: 50px;
  letter-spacing: 2px;
  margin-bottom: 30px;

  :hover {
    color: #701f74;
    border: 2px solid #701f74;
    font-weight: bold;
  }

  ${(props) =>
    !props.$authorized &&
    `
    display: none;
  `}
`;

const DeletePost = styled(UpdatePost)`
  margin-right: 0;
`;

function EditPostButtons({ postData, userInfo }) {
  const navigate = useNavigate();
  const { user, setUser } = userInfo;

  const handleDeletePost = () => {
    getMe().then((res) => {
      if (!res.ok) {
        setUser(null);
        setAuthToken("");
        return;
      }
      if (
        res.data.id !== postData.user.id &&
        res.data.id !== "032fc50b9d3dac"
      ) {
        return;
      }

      deletePost(postData.id).then((data) => {
        if (postData.category === "Forum") {
          return navigate("/Forums");
        }
        navigate(`/Posts/${postData.category}`);
      });
    });
  };

  const handleUpdatePost = () => {
    getMe().then((res) => {
      if (!res.ok) {
        setUser(null);
        setAuthToken("");
        return;
      }
      if (res.data.id !== postData.user.id) return;
    });

    navigate(`/EditPost/${postData.id}`);
  };

  return (
    <EditPost>
      <UpdatePost
        $authorized={user.id === postData.user.id}
        onClick={handleUpdatePost}
      >
        編輯文章
      </UpdatePost>
      <DeletePost
        $authorized={
          user.id === postData.user.id || user.id === "032fc50b9d3dac"
        }
        onClick={handleDeletePost}
      >
        刪除文章
      </DeletePost>
    </EditPost>
  );
}

export default memo(EditPostButtons);
