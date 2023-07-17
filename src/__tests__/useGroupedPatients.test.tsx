import useGroupedPatients from "../hooks/useGroupedPatients";
import { renderHook } from "@testing-library/react-hooks";
import { patientState, expectedGroupResult } from "../__mocks__/mockData";
import { PatientType } from "../types/Types";

// Tests do not take into account the potential recursive nature of the isCompleted field on Patient type.
// I would need to understand more before making adjustments.
describe("useGroupedPatients", () => {
  it("should return loading status and grouped patients", () => {
    const { result } = renderHook(() => useGroupedPatients(patientState));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.groupedPatients).toBeInstanceOf(Object);
  });

  it("should correctly group patients by type and exclude isCompleted true", () => {
    const { result } = renderHook(() => useGroupedPatients(patientState));

    const patientTypes: PatientType[] = [
      "a_level",
      "b_level",
      "c_level",
      "d_level",
    ];

    patientTypes.forEach((type) => {
      result.current.groupedPatients[type]?.forEach((obj) => {
        expect(obj.isCompleted).toBe(false);
      });
    });

    expect(result.current.groupedPatients).toEqual(expectedGroupResult);
  });

  it("should order patients by date and name within each group", () => {
    const { result } = renderHook(() => useGroupedPatients(patientState));

    expect(result.current.groupedPatients).toEqual(expectedGroupResult);

    const patientTypes: PatientType[] = [
      "a_level",
      "b_level",
      "c_level",
      "d_level",
    ];

    patientTypes.forEach((type) => {
      let lastDate = new Date(0);

      result.current.groupedPatients[type]?.forEach((obj) => {
        const currentDate = new Date(obj.joined);

        expect(currentDate.getTime()).toBeGreaterThanOrEqual(
          lastDate.getTime()
        );

        lastDate = currentDate;
      });
    });
  });
});
