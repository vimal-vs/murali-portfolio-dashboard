import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import PageLayout from "../components/layouts/PageLayout";
import PodcastTable from "../components/tables/PodcastsTable";
import PodcastServices from "../services/Podcast";
import PodcastForm from "../components/forms/PodcastForm";

export default function Podcasts() {
    const [addPodcastModal, setAddPodcastModal] = useState(false);

    const [podcastList, setPodcastList] = useState([]);

    const fetchPodcasts = async () => {
        try {
            const response = await PodcastServices.getAll();
            if (response.status === 200) {
                setPodcastList(response.data);
            } else {
                message.error(response.data.message || "Failed to fetch podcasts");
            }
        } catch (error) {
            message.error(error.message || "Failed to fetch podcasts");
        }
    };

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const handleCreate = async (podcastDetails) => {
        try {
            const response = await PodcastServices.create(podcastDetails);
            if (response.status === 201) {
                message.success("Podcast added successfully");
                setAddPodcastModal(false);
                fetchPodcasts();
            } else {
                message.error(response.data.message || "Failed to add podcast");
            }
        } catch (error) {
            message.error(error.message || "Failed to add podcast");
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
                title={"Podcast Management"}
                description={"Manage the podcast details here"}
                buttonTitle={"Add Podcast"}
                buttonWidth={"fit-content"}
                paddingRight={true}
                setAddModal={setAddPodcastModal}
            >
                <div className=" w-full  flex md:mt-7">
                    <PodcastTable
                        rowsPerPage={rowsPerPage}
                        rowCount={podcastList.length}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        data={podcastList}
                        fetchPodcasts={fetchPodcasts}
                    />
                </div>
            </PageLayout>
            <Modal
                title={"Add Podcast"}
                visible={addPodcastModal}
                footer={null}
                width={700}
                centered
                onCancel={() => {
                    setAddPodcastModal(false);
                }}
            >
                <PodcastForm
                    onSubmit={handleCreate}
                    buttonText={"Submit"}
                />
            </Modal>
        </>
    );
}