export default function Hand(props) {
  return (
    <div className='player-hand' key={props.className}>
      <h1 className='hand-h1' key={props.playerName + '-h1'}>{props.playerName}</h1>
      {
        !!props.playerCards &&
        props.playerCards.map(card => {
          return (
            <img className='player-cards' key={props.playerName + '-' + card.value} src={card.image}/>
          )
        })
      }
      {
        !!props.playerPoints &&
        <p className='display-points' key={props.playerName + '-points'}>
          Points: {props.playerPoints}
        </p>
      }
    </div>
  )
}