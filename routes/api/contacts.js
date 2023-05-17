const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {}
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "missing " + error.details[0].message + " field",
      });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {}
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const bodyEmpty = Object.keys(req.body).length === 0;
    if (bodyEmpty) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {}
});

module.exports = router;
