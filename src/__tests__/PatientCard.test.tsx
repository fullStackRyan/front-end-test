import { render, screen } from "@testing-library/react";
import PatientCard from "../components/PatientCard";
import { patient } from "../__mocks__/mockData";

test("renders a name", () => {
  render(<PatientCard patient={patient} />);
  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveTextContent("Name: Adam S");
  expect(divElement).toHaveTextContent("Completed: no");
  expect(divElement).toHaveAttribute("role", "contentinfo");
});
