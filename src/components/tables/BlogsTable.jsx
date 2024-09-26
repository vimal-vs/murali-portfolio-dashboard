import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import Table from "../reusable/Table/Table";
import TableHead from "../reusable/Table/TableHead";
import TableCell from "../reusable/Table/TableCell";
import Input from "../reusable/Input";
import BlogServices from "../../services/Blog";
import BlogForm from "../forms/BlogsForm";
import { Delete, Edit } from "@mui/icons-material";
import parse from 'html-react-parser';

export default function BlogsTable({
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
    const [filteredData, setFilteredData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    const openModal = (action, row) => {
        setSelectedRow(row);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const openDeleteModal = (row) => {
        setSelectedRow(row);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const response = await BlogServices.deleteById(selectedRow.id);
            if (response.status === 200) {
                message.success("Blog deleted successfully");
                fetchBlogs();
                setIsDeleteModalOpen(false);
            } else {
                message.error(response.data.message || "Failed to delete blog");
            }
        } catch (error) {
            message.error(error.message || "Failed to delete blog");
        }
    };

    const handleEdit = async (blogDetails) => {
        try {
            const response = await BlogServices.updateById(selectedRow.id, blogDetails);
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

    const handleSearch = () => {
        if (!search) {
            setFilteredData(data);
        } else {
            const lowercasedFilter = search.toLowerCase();
            const filtered = data.filter(item =>
                item.title.toLowerCase().includes(lowercasedFilter) ||
                item.author.toLowerCase().includes(lowercasedFilter) ||
                item.category.toLowerCase().includes(lowercasedFilter)
            );
            setFilteredData(filtered);
        }
    };

    const columns = [
        {
            id: "blogID",
            name: <TableHead>Blog ID</TableHead>,
            cell: (row) => (
                <TableCell>
                    <Link to={`/blog-management/${row.id}`}>
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
            id: "content",
            name: <TableHead width="300px">Content</TableHead>,
            cell: (row) =>
                <TableCell width="300px">
                    {parse(row.content)}
                </TableCell>,
        },
        {
            id: "date",
            name: <TableHead>Date</TableHead>,
            cell: (row) => <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>,
        },
        {
            id: "imageUrl",
            name: <TableHead>Image</TableHead>,
            cell: (row) => (
                <TableCell>
                    <img src={row.imageUrl} alt="Blog" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                </TableCell>
            ),
        },
        {
            id: "createdAt",
            name: <TableHead>Created At</TableHead>,
            cell: (row) => <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>,
        },
        {
            id: "actions",
            name: <TableHead>Actions</TableHead>,
            cell: (row) => (
                <TableCell>
                    <div className="space-x-4">
                        <button onClick={() => openModal("edit", row)}>
                            <Edit fontSize="small" />
                        </button>
                        <button onClick={() => openDeleteModal(row)}>
                            <Delete fontSize="small" />
                        </button>
                    </div>
                </TableCell>
            ),
        },
    ];

    return (
        <div className="w-full removeScrollBar pb-5">
            <div className="mb-5 lg:mb-8 ml-2">
                <Input
                    label={"Search"}
                    type={"text"}
                    placeholder={"Title/Author/Category"}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={handleSearch}
                />
            </div>
            <Table
                columns={columns}
                rows={filteredData}
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
                    <BlogForm
                        blog={selectedRow}
                        onSubmit={handleEdit}
                        buttonText={"Submit"}
                    />
                )}
            </Modal>
            <Modal
                title="Confirm Delete"
                visible={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onOk={handleDelete}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete <span className="font-semibold">{selectedRow?.title}</span>?</p>
            </Modal>
        </div>
    );
}
