import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import PageLayout from "../components/layouts/PageLayout";
import BlogsTable from "../components/tables/BlogsTable";
import BlogServices from "../services/Blog";
import BlogForm from "../components/forms/BlogsForm";

export default function Blogs() {
  const [addBlogModal, setAddBlogModal] = useState(false);
  const [blogList, setBlogList] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await BlogServices.getAll();
      if (response.status === 200) {
        setBlogList(response.data);
      } else {
        message.error(response.data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      message.error(error.message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (blogDetails) => {
    try {
      const response = await BlogServices.create(blogDetails);
      if (response.status === 201) {
        message.success("Blog added successfully");
        setAddBlogModal(false);
        fetchBlogs();
      } else {
        message.error(response.data.message || "Failed to add blog");
      }
    } catch (error) {
      message.error(error.message || "Failed to add blog");
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <PageLayout
        title={"Blog Management"}
        description={"Manage the blog details here"}
        buttonTitle={"Add Blog"}
        buttonWidth={"fit-content"}
        paddingRight={true}
        setAddModal={setAddBlogModal}
      >
        <div className="w-full flex md:mt-7">
          <BlogsTable
            rowsPerPage={rowsPerPage}
            rowCount={blogList.length}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            data={blogList}
            fetchBlogs={fetchBlogs}
          />
        </div>
      </PageLayout>
      <Modal
        title={"Add Blog"}
        visible={addBlogModal}
        footer={null}
        width={700}
        centered
        onCancel={() => {
          setAddBlogModal(false);
        }}
      >
        <BlogForm onSubmit={handleCreate} buttonText={"Submit"} />
      </Modal>
    </>
  );
}