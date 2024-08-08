export function CloneProps(props: any) {
  const { children, ...other } = props;
  return children(other);
}
