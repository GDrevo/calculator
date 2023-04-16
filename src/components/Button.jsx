export default function Button({name, type, onClick}) {
  return (
    <div className={"button " + type } onClick={onClick}>
      <h5>{name}</h5>
    </div>
  )
}
