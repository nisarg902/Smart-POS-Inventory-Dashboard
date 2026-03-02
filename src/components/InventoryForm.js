import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export default function InventoryForm({ onAdd }) {
    return (
        <div className="card p-3 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Add New Product</h5>
            <Formik
                initialValues={{ Name: "", Price: "", City: "" }}
                // Validation Rules (Point 5 Logic)
                validationSchema={yup.object({
                    Name: yup.string().required("Name required").min(4, "Min 4 chars"),
                    Price: yup.number().required("Price required").typeError("Numbers only"),
                    City: yup.string().required("City required")
                })}
                onSubmit={(values, { resetForm }) => {
                    onAdd(values); // Parent (App.js) ko data bhejo
                    resetForm();   // Form khali karo
                }}
            >
                <Form>
                    <label className="small fw-bold">Product Name</label>
                    <Field name="Name" type="text" className="form-control mb-1" />
                    <div className="text-danger small mb-2"><ErrorMessage name="Name" /></div>
                    
                    <label className="small fw-bold">Price (₹)</label>
                    <Field name="Price" type="text" className="form-control mb-1" />
                    <div className="text-danger small mb-2"><ErrorMessage name="Price" /></div>

                    <label className="small fw-bold">City</label>
                    <Field as="select" name="City" className="form-control mb-1">
                        <option value="">Select City</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Nagpur">Nagpur</option>
                    </Field>
                    <div className="text-danger small mb-3"><ErrorMessage name="City" /></div>

                    <button type="submit" className="btn btn-success w-100 shadow-sm">Add to Stock</button>
                </Form>
            </Formik>
        </div>
    );
}