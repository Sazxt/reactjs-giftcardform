import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const GiftCardForm = () => {
    const [formData, setFormData] = useState({
        to: "",
        message: "",
        from: "",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const previewRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setError("");
        } else {
            setError("Please upload a valid image file (PNG, JPEG).");
        }
    };

    const handleDownload = () => {
        if (!imagePreview || !formData.to || !formData.message || !formData.from) {
            setError("Please complete the form and upload an image.");
            return;
        }
        setError("");
        html2canvas(previewRef.current).then((canvas) => {
            const link = document.createElement("a");
            link.download = "greeting-card.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Preview Section */}
            <div className="flex-1 border border-dashed rounded-lg p-4 bg-gray-50" ref={previewRef}>
                <h3 className="text-lg font-bold mb-4">Gift Card Preview</h3>
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="object-cover h-full w-full" />
                    ) : (
                        <p className="text-gray-500">No image uploaded</p>
                    )}
                </div>
                <div className="mt-4 text-start">
                    <p className="text-sm"><strong>From:</strong> {formData.from}</p>
                    <p className="text-sm"><strong>To:</strong> {formData.to}</p>
                    <p className="text-sm"><strong>Message:</strong> {formData.message}</p>
                </div>
            </div>

            {/* Form Section */}
            <form className="flex-1 flex flex-col gap-4 border p-4 rounded-lg bg-white shadow-md">
                <h3 className="text-lg font-bold">Gift Card Form</h3>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        className="file-input w-full border p-2 rounded-md"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">From</label>
                    <input
                        type="text"
                        name="from"
                        placeholder="From"
                        value={formData.from}
                        onChange={handleInputChange}
                        className="input w-full border p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">To</label>
                    <input
                        type="text"
                        name="to"
                        placeholder="To"
                        value={formData.to}
                        onChange={handleInputChange}
                        className="input w-full border p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="textarea w-full border p-2 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="button"
                    onClick={handleDownload}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Download
                </button>
            </form>
        </div>
    );
};

export default GiftCardForm;
