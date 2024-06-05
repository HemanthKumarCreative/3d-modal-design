import ClipLoader from "react-spinners/ClipLoader";

const CircleLoaderComponent = () => {
  const loading = true;
  const color = "orange";
  const override = true;

  return (
    <div style={{ color, width: "fit-content", margin: "10% auto" }}>
      <h6>We are loading our awesomeness...</h6>
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default CircleLoaderComponent;
