function Result({ nameOfClass, area, value }) {
  return (
    <div className={nameOfClass}>
      {area}
      <span className="center block" id={area}>{value}</span>
    </div>
  );
}
// Verificar o id acima!!!
Result.propTypes = {
  nameOfClass: React.PropTypes.string.isRequired,
  area: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};
