import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import PageLayout from "../components/layouts/PageLayout";
import EventTable from "../components/tables/EventsTable";
import EventServices from "../services/Event";
import EventForm from "../components/forms/EventsForm";

export default function Events() {
    const [addEventModal, setAddEventModal] = useState(false);
    const [eventList, setEventList] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await EventServices.getAll();
            if (response.status === 200) {
                setEventList(response.data);
            } else {
                message.error(response.data.message || "Failed to fetch events");
            }
        } catch (error) {
            message.error(error.message || "Failed to fetch events");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreate = async (eventDetails) => {
        try {
            const response = await EventServices.create(eventDetails);
            if (response.status === 201) {
                message.success("Event added successfully");
                setAddEventModal(false);
                fetchEvents();
            } else {
                message.error(response.data.message || "Failed to add event");
            }
        } catch (error) {
            message.error(error.message || "Failed to add event");
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
                title={"Event Management"}
                description={"Manage the event details here"}
                buttonTitle={"Add Event"}
                buttonWidth={"fit-content"}
                paddingRight={true}
                setAddModal={setAddEventModal}
            >
                <div className="w-full flex md:mt-7">
                    <EventTable
                        rowsPerPage={rowsPerPage}
                        rowCount={eventList.length}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        data={eventList}
                        fetchEvents={fetchEvents}
                    />
                </div>
            </PageLayout>
            <Modal
                title={"Add Event"}
                visible={addEventModal}
                footer={null}
                width={700}
                centered
                onCancel={() => {
                    setAddEventModal(false);
                }}
            >
                <EventForm onSubmit={handleCreate} buttonText={"Submit"} />
            </Modal>
        </>
    );
}
