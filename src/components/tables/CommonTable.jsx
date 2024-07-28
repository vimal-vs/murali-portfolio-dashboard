import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Card, Button } from "antd";
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
        <Card title={title} className="mb-4 shadow-md">
            <Descriptions column={1}>
                {data && Object.entries(data).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Card>
    );

    return (
        <div className="w-full removeScrollBar pb-5 ml-4 mr-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Common Data</h2>
                <Button icon={<Edit />} onClick={() => openModal("edit", selectedRow)}>
                    Edit
                </Button>
            </div>
            {renderSection("Statistics", selectedRow?.statistics)}
            {renderSection("Footer", selectedRow?.footer)}
            {renderSection("Landing", selectedRow?.landing)}
            {renderSection("Links", selectedRow?.links)}
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
                        buttonText={"Save"}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </Modal>
        </div>
    );
}