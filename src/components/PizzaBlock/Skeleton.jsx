import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={245}
    height={400}
    viewBox="0 0 245 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="120" cy="120" r="120" /> 
    <rect x="1" y="280" rx="10" ry="10" width="245" height="76" /> 
    <rect x="0" y="365" rx="10" ry="10" width="105" height="35" /> 
    <rect x="115" y="365" rx="10" ry="10" width="130" height="35" /> 
    <rect x="0" y="246" rx="10" ry="10" width="245" height="25" />
  </ContentLoader>
)

export default Skeleton

