import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Edit } from "@mui/icons-material";
import CommonForm from "../../components/forms/CommonForm";

export default function CommonTable({ data: initialData, onSubmit }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [selectedRow, setSelectedRow] = useState(initialData);

    useEffect(() => {
        setSelectedRow(initialData);
    }, [initialData]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openModal = (action, row) => {
        setSelectedRow(row);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const renderSection = (title, data) => (
        <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );

    return (
        <div className="w-full removeScrollBar pb-5">
            <div className="mb-8 p-4 border rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Common Entry</h2>
                    <button onClick={() => openModal("edit", selectedRow)}>
                        <Edit fontSize="small" />
                    </button>
                </div>
                {renderSection("Statistics", selectedRow?.statistics)}
                {renderSection("Footer", selectedRow?.footer)}
                {renderSection("Landing", selectedRow?.landing)}
                {renderSection("Links", selectedRow?.links)}
            </div>
            <Modal
                title={modalAction === "edit" ? "Edit Common" : ""}
                visible={isModalOpen}
                onCancel={handleCancel}
                width={700}
                centered
                footer={null}
            >
                {modalAction === "edit" && (
                    <CommonForm
                        common={selectedRow}
                        onSubmit={onSubmit}
                        buttonText={"Submit"}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </Modal>
        </div>
    );
}