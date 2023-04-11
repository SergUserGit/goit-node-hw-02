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
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
