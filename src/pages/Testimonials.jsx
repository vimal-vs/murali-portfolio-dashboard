import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import PageLayout from "../components/layouts/PageLayout";
import TestimonialTable from "../components/tables/TestimonialsTable"; // Assuming this component exists
import TestimonialServices from "../services/Testimonial"; // Adjust this service according to your setup
import TestimonialForm from "../components/forms/TestimonialsForm"; // Adjust the form component according to your setup

export default function Testimonials() {
    const [addTestimonialModal, setAddTestimonialModal] = useState(false);
    const [testimonialList, setTestimonialList] = useState([]);

    const fetchTestimonials = async () => {
        try {
            const response = await TestimonialServices.getAll(); // Adjust according to your service method
            if (response.status === 200) {
                setTestimonialList(response.data);
            } else {
                message.error(response.data.message || "Failed to fetch testimonials");
            }
        } catch (error) {
            message.error(error.message || "Failed to fetch testimonials");
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleCreate = async (testimonialDetails) => {
        try {
            const response = await TestimonialServices.create(testimonialDetails); // Adjust according to your service method
            if (response.status === 201) {
                message.success("Testimonial added successfully");
                setAddTestimonialModal(false);
                fetchTestimonials();
            } else {
                message.error(response.data.message || "Failed to add testimonial");
            }
        } catch (error) {
            message.error(error.message || "Failed to add testimonial");
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
                title={"Testimonial Management"}
                description={"Manage the testimonial details here"}
                buttonTitle={"Add Testimonial"}
                buttonWidth={"fit-content"}
                paddingRight={true}
                setAddModal={setAddTestimonialModal}
            >
                <div className="w-full flex md:mt-7">
                    <TestimonialTable
                        rowsPerPage={rowsPerPage}
                        rowCount={testimonialList.length}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        data={testimonialList}
                        fetchTestimonials={fetchTestimonials}
                    />
                </div>
            </PageLayout>
            <Modal
                title={"Add Testimonial"}
                visible={addTestimonialModal}
                footer={null}
                width={700}
                centered
                onCancel={() => {
                    setAddTestimonialModal(false);
                }}
            >
                <TestimonialForm onSubmit={handleCreate} buttonText={"Submit"} />
            </Modal>
        </>
    );
}
