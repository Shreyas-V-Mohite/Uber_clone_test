const Customer = require("../models/Customer");
const { uploadToMinio } = require("../utils/minioClient");
const multer = require('multer');
const upload = multer();

// Customer-related actions

const addCustomer = async (req, res) => {
    try {
        const { name, email, password, dob, city, state, country, phone } = req.body;
        const files = req.files;

        let imageKeys = [];
        if (files && files.length > 0) {
            imageKeys = await Promise.all(files.map(file => uploadToMinio(file)));
        }

        const customer = await Customer.create({ name, email, password, dob, city, state, country, phone, images: imageKeys.join(',') });
        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (error) {
        console.error("Error in addCustomer:", error); // Debugging
        res.status(500).json({ message: "Error adding customer", error });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { customer_id } = req.params;
        const { name, email, password, dob, city, state, country, phone } = req.body;
        const files = req.files;

        const customer = await Customer.findByPk(customer_id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        let imageKeys = customer.images ? customer.images.split(',') : [];
        if (files && files.length > 0) {
            const newImageKeys = await Promise.all(files.map(file => uploadToMinio(file)));
            imageKeys = imageKeys.concat(newImageKeys);
        }

        await customer.update({ name, email, password, dob, city, state, country, phone, images: imageKeys.join(',') });
        res.status(200).json({ message: "Customer updated successfully", customer });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

module.exports = {
    addCustomer,
    updateCustomer,
};
