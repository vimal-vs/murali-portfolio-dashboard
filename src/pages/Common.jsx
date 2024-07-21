import { useEffect, useState } from "react";
import { message } from "antd";
import PageLayout from "../components/layouts/PageLayout";
import CommonTable from "../components/tables/CommonTable";
import CommonService from "../services/Common";

export default function Common() {
    const [commonList, setCommonList] = useState([]);

    const fetchCommon = async () => {
        try {
            const response = await CommonService.getById(1);
            if (response.status === 200) {
                setCommonList(response.data);
            } else {
                message.error(response.data.message || "Failed to fetch common entries");
            }
        } catch (error) {
            message.error(error.message || "Failed to fetch common entries");
        }
    };

    useEffect(() => {
        fetchCommon();
    }, []);

    const handleEdit = async (commonDetails, setIsModalOpen) => {
        try {
            const response = await CommonService.updateById(1, commonDetails);
            if (response.status === 200) {
                message.success("Common entry updated successfully");
                fetchCommon();
                setIsModalOpen(false);
            } else {
                message.error(response.data.message || "Failed to update common entry");
            }
        } catch (error) {
            message.error(error.message || "Failed to update common entry");
        }
    };

    return (
        <>
            <PageLayout
                title={"Data Management"}
                description={"Manage the common details here"}
            >
                <div className=" w-full  flex md:mt-7">
                    <CommonTable
                        data={commonList}
                        onSubmit={handleEdit}
                    />
                </div>
            </PageLayout>
        </>
    );
}