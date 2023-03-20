const If = ({ condition, children, fallback = null }) => <>{condition ? children : fallback}</>

export default If
