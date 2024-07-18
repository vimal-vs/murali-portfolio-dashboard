import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, message, Tabs } from "antd";
import DropDown from "../components/reusable/DropDown";
import Button from "../components/reusable/Button";
import Input from "../components/reusable/Input";
import PageLayout from "../components/layouts/PageLayout";
import PodcastTable from "../components/tables/PodcastsTable";
import PodcastServices from "../services/Podcast";

const { TabPane } = Tabs;

export default function Podcasts() {
    const location = useLocation().pathname;
    const activeTab = location.split("/")[2];
    const navigate = useNavigate();

    const [addPodcastModal, setAddPodcastModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [host, setHost] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [titleValidation, setTitleValidation] = useState("");
    const [descriptionValidation, setDescriptionValidation] = useState("");
    const [hostValidation, setHostValidation] = useState("");
    const [categoryValidation, setCategoryValidation] = useState("");
    const [dateValidation, setDateValidation] = useState("");
    const [linkValidation, setLinkValidation] = useState("");
    const [imageUrlValidation, setImageUrlValidation] = useState("");

    const [podcastList, setPodcastList] = useState([]);
    const categories = []; // Fill this with your categories

    const fetchPodcasts = async () => {
        try {
            const response = await PodcastServices.getPodcasts();
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

    const handleSubmit = async () => {
        const podcastDetails = {
            title,
            description,
            host,
            category,
            date,
            link,
            imageUrl,
        };

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

    const AddPodcastModalContent = () => {
        return (
            <div className="w-full relative">
                <button
                    onClick={() => {
                        setTitle("");
                        setTitleValidation("");
                        setDescription("");
                        setDescriptionValidation("");
                        setHost("");
                        setHostValidation("");
                        setCategory("");
                        setCategoryValidation("");
                        setDate("");
                        setDateValidation("");
                        setLink("");
                        setLinkValidation("");
                        setImageUrl("");
                        setImageUrlValidation("");
                    }}
                    className="flex items-center absolute -right-3 -top-3 justify-center w-8 h-8 mb-4 mr-4 bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                    <div className="mb-1 text-xl ml-[1px] text-center text-[#273775]">
                        x
                    </div>
                </button>
                <div className="w-full text-start text-lg mt-1 font-semibold text-gray-800">
                    Add Podcast
                </div>
                <div className="w-full flex flex-col gap-3 lg:gap-3 py-10">
                    <p className="text-base font-semibold">Podcast Details</p>
                    <div className="w-full flex flex-wrap md:grid md:grid-cols-2 justify-center items-center gap-3 lg:gap-x-6">
                        <Input
                            label={"Title"}
                            placeholder={"Enter podcast title"}
                            value={title}
                            error={titleValidation !== "" ? titleValidation : ""}
                            onChange={(e) => setTitle(e.target.value)}
                            mandate={true}
                        />
                        <Input
                            label={"Description"}
                            placeholder={"Enter podcast description"}
                            value={description}
                            error={descriptionValidation !== "" ? descriptionValidation : ""}
                            onChange={(e) => setDescription(e.target.value)}
                            mandate={true}
                        />
                        <Input
                            label={"Host"}
                            placeholder={"Enter host name"}
                            value={host}
                            error={hostValidation !== "" ? hostValidation : ""}
                            onChange={(e) => setHost(e.target.value)}
                            mandate={true}
                        />
                        <DropDown
                            label={"Category"}
                            placeholder={"Select category"}
                            displayValue={"name"}
                            data={categories}
                            value={category}
                            error={categoryValidation !== "" ? categoryValidation : ""}
                            setValue={setCategory}
                            mandate={true}
                        />
                        <Input
                            label={"Date"}
                            type="date"
                            value={date}
                            error={dateValidation !== "" ? dateValidation : ""}
                            onChange={(e) => setDate(e.target.value)}
                            mandate={true}
                        />
                        <Input
                            label={"Link"}
                            placeholder={"Enter podcast link"}
                            value={link}
                            error={linkValidation !== "" ? linkValidation : ""}
                            onChange={(e) => setLink(e.target.value)}
                            mandate={true}
                        />
                        <Input
                            label={"Image URL"}
                            placeholder={"Enter image URL"}
                            value={imageUrl}
                            error={imageUrlValidation !== "" ? imageUrlValidation : ""}
                            onChange={(e) => setImageUrl(e.target.value)}
                            mandate={true}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button
                        text={"Submit"}
                        width={"170px"}
                        onClick={() => {
                            let isValid = true;
                            if (title === "") {
                                setTitleValidation("Please enter podcast title");
                                isValid = false;
                            } else {
                                setTitleValidation("");
                            }
                            if (description === "") {
                                setDescriptionValidation("Please enter podcast description");
                                isValid = false;
                            } else {
                                setDescriptionValidation("");
                            }
                            if (host === "") {
                                setHostValidation("Please enter host name");
                                isValid = false;
                            } else {
                                setHostValidation("");
                            }
                            if (category === "") {
                                setCategoryValidation("Please select category");
                                isValid = false;
                            } else {
                                setCategoryValidation("");
                            }
                            if (date === "") {
                                setDateValidation("Please enter date");
                                isValid = false;
                            } else {
                                setDateValidation("");
                            }
                            if (link === "") {
                                setLinkValidation("Please enter podcast link");
                                isValid = false;
                            } else {
                                setLinkValidation("");
                            }
                            if (imageUrl === "") {
                                setImageUrlValidation("Please enter image URL");
                                isValid = false;
                            } else {
                                setImageUrlValidation("");
                            }
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
            key: "podcasts",
            label: (
                <div>Podcasts</div>
            ),
            children: (
                <PodcastTable
                    activeKey={activeKey}
                    rowsPerPage={rowsPerPage}
                    rowCount={podcastList.length}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    data={podcastList}
                    fetchPodcasts={fetchPodcasts}
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
                title={"Podcast Management"}
                description={"Manage the podcast details here"}
                buttonTitle={"Add Podcast"}
                buttonWidth={"fit-content"}
                paddingRight={true}
                setAddTripModal={setAddPodcastModal}
            >
                <div className=" w-full  flex md:mt-7">
                    <Tabs
                        style={{
                            width: "100%",
                            height: "100%",
                            overflowY: "scroll",
                        }}
                        activeKey={activeKey}
                        defaultActiveKey="podcasts"
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
                title={"Add Podcast"}
                visible={addPodcastModal}
                footer={null}
                closable={false}
                width={1200}
                centered
            >
                <AddPodcastModalContent />
            </Modal>
        </>
    );
}
