export type FormState =
  | {
      status: "ERROR";
      type: "Server Error" | "Location" | "Image Error";
      message: string;
    }
  | {
      status: "SUCCESS";
      message: string;
    }
  | {
      status: "PENDING";
      message: string;
    }
  | {
      status: "INITIAL";
    }
  | null;
