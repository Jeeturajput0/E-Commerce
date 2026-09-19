const Card = ({ children, className = "" }) => (
  <div className={`glass rounded-3xl p-5 ${className}`}>{children}</div>
);

export default Card;

