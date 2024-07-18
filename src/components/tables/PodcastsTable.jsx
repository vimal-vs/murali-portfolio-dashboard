import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import Table from "../../components/reusable/Table/Table";
import TableHead from "../../components/reusable/Table/TableHead";
import TableCell from "../../components/reusable/Table/TableCell";
import Input from "../../components/reusable/Input";
import Button from "../../components/reusable/Button";
import PodcastServices from "../../services/Podcast";

export default function PodcastsTable({
    activeKey,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    rowCount,
    data,
    fetchPodcasts
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
            const response = await PodcastServices.delete(id);
            if (response.status === 204) {
                message.success("Podcast deleted successfully");
                fetchPodcasts(); // Call fetchPodcasts to refresh the table after deletion
            } else {
                message.error(response.data.message || "Failed to delete podcast");
            }
        } catch (error) {
            message.error(error.message || "Failed to delete podcast");
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
            id: "updatedAt",
            name: <TableHead>Updated At</TableHead>,
            cell: (row) => <TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>,
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
                    placeholder={"title/description/url"}
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
                title={modalAction === "edit" ? "Edit Podcast" : ""}
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {modalAction === "edit" && (
                    <EditPodcastForm
                        podcast={selectedRow}
                        handleCancel={handleCancel}
                        fetchPodcasts={fetchPodcasts} // Define fetchPodcasts to refresh the podcast list
                    />
                )}
            </Modal>
        </div>
    );
}

const EditPodcastForm = ({ podcast, handleCancel, fetchPodcasts }) => {
    const [title, setTitle] = useState(podcast.title);
    const [description, setDescription] = useState(podcast.description);
    const [url, setUrl] = useState(podcast.url);

    const handleSubmit = async () => {
        const podcastDetails = {
            id: podcast.id,
            title,
            description,
            url,
        };

        try {
            const response = await PodcastServices.update(podcastDetails);
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

    return (
        <div className="w-full">
            <Input
                label={"Title"}
                placeholder={"Enter podcast title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                label={"Description"}
                placeholder={"Enter podcast description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label={"URL"}
                placeholder={"Enter podcast URL"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className="w-full flex justify-center items-center">
                <Button text={"Submit"} onClick={handleSubmit} />
            </div>
        </div>
    );
};
