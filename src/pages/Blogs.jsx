import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import DropDown from "../components/reusable/DropDown";
import Button from "../components/reusable/Button";
import Input from "../components/reusable/Input";
import PageLayout from "../components/layouts/PageLayout";
import BlogTable from "../components/tables/BlogsTable";
import BlogServices from "../services/Blog";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default function Blogs() {
  const location = useLocation().pathname;
  const activeTab = location.split("/")[2];
  const navigate = useNavigate();

  const [addBlogModal, setAddBlogModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const [titleValidation, setTitleValidation] = useState("");
  const [contentValidation, setContentValidation] = useState("");
  const [authorValidation, setAuthorValidation] = useState("");
  const [categoryValidation, setCategoryValidation] = useState("");

  const [blogList, setBlogList] = useState([]);
  const categories = [];

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

  const handleSubmit = async () => {
    const blogDetails = {
      title,
      content,
      author,
      category,
    };

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

  const AddBlogModalContent = () => {
    return (
      <div className="w-full relative">
        <button
          onClick={() => {
            setTitle("");
            setTitleValidation("");
            setContent("");
            setContentValidation("");
            setAuthor("");
            setAuthorValidation("");
            setCategory("");
            setCategoryValidation("");
          }}
          className="flex items-center absolute -right-3 -top-3 justify-center w-8 h-8 mb-4 mr-4 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <div className="mb-1 text-xl ml-[1px] text-center text-[#273775]">
            x
          </div>
        </button>
        <div className="w-full text-start text-lg mt-1 font-semibold text-gray-800">
          Add Blog
        </div>
        <div className="w-full flex flex-col gap-3 lg:gap-3 py-10">
          <p className="text-base font-semibold">Blog Details</p>
          <div className="w-full flex flex-wrap md:grid md:grid-cols-2 justify-center items-center gap-3 lg:gap-x-6">
            <Input
              label={"Title"}
              placeholder={"Enter blog title"}
              value={title}
              error={titleValidation !== "" ? titleValidation : ""}
              onChange={(e) => setTitle(e.target.value)}
              mandate={true}
            />
            <Input
              label={"Content"}
              placeholder={"Enter blog content"}
              value={content}
              error={contentValidation !== "" ? contentValidation : ""}
              onChange={(e) => setContent(e.target.value)}
              mandate={true}
            />
            <Input
              label={"Author"}
              placeholder={"Enter author name"}
              value={author}
              error={authorValidation !== "" ? authorValidation : ""}
              onChange={(e) => setAuthor(e.target.value)}
              mandate={true}
            />
            {/* <DropDown
              label={"Category"}
              placeholder={"Select category"}
              displayValue={"name"}
              data={categories}
              value={category}
              error={categoryValidation !== "" ? categoryValidation : ""}
              setValue={setCategory}
              mandate={true}
            /> */}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            text={"Submit"}
            width={"170px"}
            onClick={() => {
              let isValid = true;
              if (title === "") {
                setTitleValidation("Please enter blog title");
                isValid = false;
              } else {
                setTitleValidation("");
              }
              if (content === "") {
                setContentValidation("Please enter blog content");
                isValid = false;
              } else {
                setContentValidation("");
              }
              if (author === "") {
                setAuthorValidation("Please enter author name");
                isValid = false;
              } else {
                setAuthorValidation("");
              }
              // if (category === "") {
              //   setCategoryValidation("Please select category");
              //   isValid = false;
              // } else {
              //   setCategoryValidation("");
              // }
              if (isValid) {
                handleSubmit();
              }
            }}
          />
        </div>
      </div>
    );
  };

  const [activeKey, setActiveKey] = useState(activeTab);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tabContents = [
    {
      key: "blogs",
      label: (
        <div>Blogs</div>
      ),
      children: (
        <BlogTable
          activeKey={activeKey}
          rowsPerPage={rowsPerPage}
          rowCount={blogList.length}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={blogList}
          fetchBlogs={fetchBlogs}
        />
      ),
    },
  ];

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
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
        <div className=" w-full  flex md:mt-7">
          <Tabs
            style={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
            }}
            activeKey={activeKey}
            defaultActiveKey="blogs"
            onChange={onChange}
          >
            {tabContents.map((tab) => (
              <TabPane
                style={{
                  width: "100%",
                  height: "100vh",
                  overflowY: "scroll",
                }}
                tab={tab.label}
                key={tab.key}
              >
                {tab.children}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </PageLayout>
      <Modal
        title={null}
        visible={addBlogModal}
        width={"1000px"}
        closeIcon={null}
        afterClose={() => {
          setAddBlogModal(false);
        }}
        onCancel={() => {
          setAddBlogModal(false);
        }}
        centered
        footer={null}
      >
        {AddBlogModalContent()}
      </Modal>
    </>
  );
}