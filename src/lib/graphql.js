const GRAPHQL_URL = "http://localhost:5000/graphql";

export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}

// GraphQL Queries and Mutations
export const queries = {
  getTasks: `
    query GetTasks {
      tasks {
        id
        title
        description
        status
        createdAt
      }
    }
  `,

  createTask: `
    mutation CreateTask($title: String!, $description: String!) {
      createTask(title: $title, description: $description) {
        id
        title
        description
        status
        createdAt
      }
    }
  `,

  updateTask: `
    mutation UpdateTask($id: ID!, $title: String, $description: String, $status: String) {
      updateTask(id: $id, title: $title, description: $description, status: $status) {
        id
        title
        description
        status
        createdAt
      }
    }
  `,

  deleteTask: `
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id) {
        id
      }
    }
  `,
};
