import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import Table from "../reusable/Table/Table";
import TableHead from "../reusable/Table/TableHead";
import TableCell from "../reusable/Table/TableCell";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import BlogServices from "../../services/Blog";

export default function BlogTable({
    activeKey,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    rowCount,
    data,
    fetchBlogs
}) {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openModal = (action, row) => {
        setSelectedRow(row);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await BlogServices.delete(id);
            if (response.status === 200) {
                message.success("Blog deleted successfully");
                // Call fetchBlogs to refresh the table after deletion
                fetchBlogs();
            } else {
                message.error(response.data.message || "Failed to delete blog");
            }
        } catch (error) {
            message.error(error.message || "Failed to delete blog");
        }
    };

    const columns = [
        {
            id: "blogID",
            name: <TableHead>Blog ID</TableHead>,
            cell: (row) => (
                <TableCell>
                    <Link
                        className=" text-primary-blue"
                        to={`/blog-management/${row.id}?id=${row.id}`}
                    >
                        {row.id}
                    </Link>
                </TableCell>
            ),
        },
        {
            id: "title",
            name: <TableHead>Title</TableHead>,
            cell: (row) => <TableCell>{row.title}</TableCell>,
        },
        {
            id: "author",
            name: <TableHead>Author</TableHead>,
            cell: (row) => <TableCell>{row.author}</TableCell>,
        },
        {
            id: "category",
            name: <TableHead>Category</TableHead>,
            cell: (row) => <TableCell>{row.category}</TableCell>,
        },
        {
            id: "date",
            name: <TableHead>Date</TableHead>,
            cell: (row) => <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>,
        },
        {
            id: "link",
            name: <TableHead>Link</TableHead>,
            cell: (row) => (
                <TableCell>
                    <a href={row.link} target="_blank" rel="noopener noreferrer">
                        {row.link}
                    </a>
                </TableCell>
            ),
        },
        {
            id: "imageUrl",
            name: <TableHead>Image</TableHead>,
            cell: (row) => (
                <TableCell>
                    <img src={row.imageUrl} alt="Blog" style={{ width: "50px" }} />
                </TableCell>
            ),
        },
        {
            id: "actions",
            name: <TableHead>Actions</TableHead>,
            cell: (row) => (
                <TableCell>
                    <Button text="Edit" onClick={() => openModal("edit", row)} />
                    <Button text="Delete" onClick={() => handleDelete(row.id)} />
                </TableCell>
            ),
        },
    ];

    return (
        <div className="w-full removeScrollBar pb-5">
            <div className="flex flex-wrap lg:gap-8 gap-2 w-full justify-center lg:flex-nowrap lg:pl-2 lg:pr-10 lg:justify-start items-center mb-5 lg:mb-10 mt-2 lg:mt-6">
                <Input
                    label={"Search"}
                    type={"text"}
                    placeholder={"title/author/category"}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table
                columns={columns}
                rows={data}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPage={rowsPerPage}
                rowCount={rowCount || 0}
            />
            <Modal
                title={modalAction === "edit" ? "Edit Blog" : ""}
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {modalAction === "edit" && (
                    <EditBlogForm
                        blog={selectedRow}
                        handleCancel={handleCancel}
                        fetchBlogs={fetchBlogs} // Define fetchBlogs to refresh the blog list
                    />
                )}
            </Modal>
        </div>
    );
}

const EditBlogForm = ({ blog, handleCancel, fetchBlogs }) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [author, setAuthor] = useState(blog.author);
    const [category, setCategory] = useState(blog.category);
    const [date, setDate] = useState(new Date(blog.date).toISOString().substr(0, 10));
    const [link, setLink] = useState(blog.link);
    const [imageUrl, setImageUrl] = useState(blog.imageUrl);

    const handleSubmit = async () => {
        const blogDetails = {
            id: blog.id,
            title,
            content,
            author,
            category,
            date,
            link,
            imageUrl,
        };

        try {
            const response = await BlogServices.updateById(blog.id, blogDetails);
            if (response.status === 200) {
                message.success("Blog updated successfully");
                handleCancel();
                fetchBlogs();
            } else {
                message.error(response.data.message || "Failed to update blog");
            }
        } catch (error) {
            message.error(error.message || "Failed to update blog");
        }
    };

    return (
        <div className="w-full">
            <Input
                label={"Title"}
                placeholder={"Enter blog title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                label={"Content"}
                placeholder={"Enter blog content"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Input
                label={"Author"}
                placeholder={"Enter author name"}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <Input
                label={"Category"}
                placeholder={"Enter category"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Input
                label={"Date"}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <Input
                label={"Link"}
                placeholder={"Enter blog link"}
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <Input
                label={"Image URL"}
                placeholder={"Enter image URL"}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="w-full flex justify-center items-center">
                <Button text={"Submit"} onClick={handleSubmit} />
            </div>
        </div>
    );
};
