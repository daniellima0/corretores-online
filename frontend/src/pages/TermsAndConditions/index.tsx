import pdfFile from "@/assets/terms-and-conditions.pdf";

const TermsAndConditions = () => {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        title="Terms and Conditions"
        src={pdfFile}
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default TermsAndConditions;
