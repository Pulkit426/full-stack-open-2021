import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls onSubmit", () => {
  const mockAddBlog = jest.fn();

  render(<BlogForm addBlog={mockAddBlog} />);

  const title = screen.getByPlaceholderText("title input");
  const author = screen.getByPlaceholderText("author input");
  const url = screen.getByPlaceholderText("url input");
  const submitButton = screen.getByText("Create");

  fireEvent.change(title, { target: { value: "Testing blog" } });
  fireEvent.change(author, { target: { value: "Pulkit" } });
  fireEvent.change(url, { target: { value: "blog/test" } });
  fireEvent.click(submitButton);

  expect(mockAddBlog.mock.calls).toHaveLength(1);
  expect(mockAddBlog.mock.calls[0][0].title).toBe("Testing blog");
  expect(mockAddBlog.mock.calls[0][0].author).toBe("Pulkit");
  expect(mockAddBlog.mock.calls[0][0].url).toBe("blog/test");
});
