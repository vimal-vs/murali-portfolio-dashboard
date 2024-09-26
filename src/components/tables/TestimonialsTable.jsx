import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import Table from "../../components/reusable/Table/Table";
import TableHead from "../../components/reusable/Table/TableHead";
import TableCell from "../../components/reusable/Table/TableCell";
import TestimonialServices from "../../services/Testimonial";
import { Delete, Edit } from "@mui/icons-material";
import TestimonialForm from "../../components/forms/TestimonialsForm";
import Input from "../reusable/Input";

export default function TestimonialsTable({
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    rowCount,
    data: initialData,
    fetchTestimonials
}) {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(initialData);
    }, [initialData]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
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
            const response = await TestimonialServices.deleteById(selectedRow?.id);
            if (response.status === 200) {
                message.success("Testimonial deleted successfully");
                fetchTestimonials();
                setIsDeleteModalOpen(false);
            } else {
                message.error(response.data.message || "Failed to delete testimonial");
            }
        } catch (error) {
            message.error(error.message || "Failed to delete testimonial");
        }
    };

    const handleEdit = async (testimonialDetails) => {
        try {
            const response = await TestimonialServices.updateById(selectedRow.id, testimonialDetails);
            if (response.status === 200) {
                message.success("Testimonial updated successfully");
                handleCancel();
                fetchTestimonials();
            } else {
                message.error(response.data.message || "Failed to update testimonial");
            }
        } catch (error) {
            message.error(error.message || "Failed to update testimonial");
        }
    };

    const handleSearch = (search) => {
        if (!search) {
            setFilteredData(initialData);
        } else {
            const lowercasedFilter = search.toLowerCase();
            const filtered = initialData.filter(item =>
                item.content.toLowerCase().includes(lowercasedFilter) ||
                item.name.toLowerCase().includes(lowercasedFilter) ||
                item.designation.toLowerCase().includes(lowercasedFilter)
            );
            setFilteredData(filtered);
        }
    };

    const columns = [
        {
            id: "testimonialID",
            name: <TableHead>Testimonial ID</TableHead>,
            cell: (row) => (
                <TableCell>{row.id}</TableCell>
            ),
        },
        {
            id: "content",
            name: <TableHead width="300px">Content</TableHead>,
            cell: (row) => <TableCell width="300px">{row.content}</TableCell>,
        },
        {
            id: "name",
            name: <TableHead>Name</TableHead>,
            cell: (row) => <TableCell>{row.name}</TableCell>,
        },
        {
            id: "designation",
            name: <TableHead width="200px">Designation</TableHead>,
            cell: (row) => <TableCell width="200px">{row.designation}</TableCell>,
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
                    placeholder={"content/name/designation"}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); handleSearch(e.target.value); }}
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
                title={modalAction === "edit" ? "Edit Testimonial" : ""}
                visible={isModalOpen}
                onCancel={handleCancel}
                width={700}
                centered
                footer={null}
            >
                {modalAction === "edit" && (
                    <TestimonialForm
                        testimonial={selectedRow}
                        onSubmit={handleEdit}
                        buttonText={"Submit"}
                    />
                )}
            </Modal>
            <Modal
                title="Confirm Delete"
                visible={isDeleteModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete <span className="font-semibold">{selectedRow?.name}</span>'s testimonial?</p>
            </Modal>
        </div>
    );
}