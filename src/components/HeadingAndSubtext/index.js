function HeadingAndSubtext(props) {
  return (
    <>
      <h2
        className={`"mx-0 font-bold text-center ${
          props.textSize ? "text-2xl lg:text-4.5xl" : "text-2xl"
        }`}
      >
        {props.heading}
      </h2>
      <p
        className={`"text-center mt-5 ${
          props.textSize ? "lg:mt-12 lg:text-sm text-sm" : ""
        }`}
      >
        {props.subtext}
      </p>
    </>
  );
}

export default HeadingAndSubtext;
