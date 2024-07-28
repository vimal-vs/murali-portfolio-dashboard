import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import Table from "../../components/reusable/Table/Table";
import TableHead from "../../components/reusable/Table/TableHead";
import TableCell from "../../components/reusable/Table/TableCell";
import Input from "../../components/reusable/Input";
import PodcastServices from "../../services/Podcast";
import { Delete, Edit } from "@mui/icons-material";
import PodcastForm from "../../components/forms/PodcastForm";

export default function PodcastsTable({
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    rowCount,
    data: initialData,
    fetchPodcasts
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
            const response = await PodcastServices.deleteById(selectedRow?.id);
            if (response.status === 204) {
                message.success("Podcast deleted successfully");
                fetchPodcasts();
                setIsDeleteModalOpen(false);
            } else {
                message.error(response.data.message || "Failed to delete podcast");
            }
        } catch (error) {
            message.error(error.message || "Failed to delete podcast");
        }
    };

    const handleEdit = async (podcastDetails) => {
        try {
            const response = await PodcastServices.updateById(selectedRow.id, podcastDetails);
            if (response.status === 200) {
                message.success("Podcast updated successfully");
                handleCancel();
                fetchPodcasts();
            } else {
                message.error(response.data.message || "Failed to update podcast");
            }
        } catch (error) {
            message.error(error.message || "Failed to update podcast");
        }
    };

    const handleSearch = (search) => {
        if (!search) {
            setFilteredData(initialData);
        } else {
            const lowercasedFilter = search.toLowerCase();
            const filtered = initialData.filter(item =>
                item.title.toLowerCase().includes(lowercasedFilter) ||
                item.description.toLowerCase().includes(lowercasedFilter) ||
                item.url.toLowerCase().includes(lowercasedFilter)
            );
            setFilteredData(filtered);
        }
    };

    const columns = [
        {
            id: "podcastID",
            name: <TableHead>Podcast ID</TableHead>,
            cell: (row) => (
                <TableCell>
                    <Link
                        className=" text-primary-blue"
                        to={`/podcast-management/${row.id}?id=${row.id}`}
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
            id: "description",
            name: <TableHead>Description</TableHead>,
            cell: (row) => <TableCell>{row.description}</TableCell>,
        },
        {
            id: "url",
            name: <TableHead>URL</TableHead>,
            cell: (row) => (
                <TableCell>
                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                        {row.url}
                    </a>
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
                    placeholder={"title/description/url"}
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
                title={modalAction === "edit" ? "Edit Podcast" : ""}
                visible={isModalOpen}
                onCancel={handleCancel}
                width={700}
                centered
                footer={null}
            >
                {modalAction === "edit" && (
                    <PodcastForm
                        podcast={selectedRow}
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
                <p>Are you sure you want to delete <span className="font-semibold">{selectedRow?.title}</span>?</p>
            </Modal>
        </div>
    );
}
