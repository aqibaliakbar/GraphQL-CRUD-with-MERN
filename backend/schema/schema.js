import Task from "../models/Task.js";
import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    createdAt: String!
  }

  type Query {
    task(id: ID!): Task
    tasks: [Task]
    tasksByStatus(status: String!): [Task]
  }

  type Mutation {
    createTask(title: String!, description: String!): Task
    updateTask(id: ID!, title: String, description: String, status: String): Task
    deleteTask(id: ID!): Task
  }
`);

export const root = {
  // Queries
  task: async ({ id }) => {
    try {
      return await Task.findById(id);
    } catch (error) {
      throw new Error("Error fetching task: " + error.message);
    }
  },

  tasks: async () => {
    try {
      return await Task.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Error fetching tasks: " + error.message);
    }
  },

  tasksByStatus: async ({ status }) => {
    try {
      return await Task.find({ status }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Error fetching tasks by status: " + error.message);
    }
  },

  // Mutations
  createTask: async ({ title, description }) => {
    try {
      const task = new Task({
        title,
        description,
      });
      return await task.save();
    } catch (error) {
      throw new Error("Error creating task: " + error.message);
    }
  },

  updateTask: async ({ id, title, description, status }) => {
    try {
      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (status) updateData.status = status;

      return await Task.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // Returns the updated document
      );
    } catch (error) {
      throw new Error("Error updating task: " + error.message);
    }
  },

  deleteTask: async ({ id }) => {
    try {
      return await Task.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting task: " + error.message);
    }
  },
};
