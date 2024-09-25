const Spacing = ({ size }: { size: number }) => {
  const spacingStyle = {
    marginTop: `${size}px`,
  };

  return <div style={spacingStyle}></div>;
};

export default Spacing;
