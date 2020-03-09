  
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        randomPlantOfTheDay: null,
      }
  }


  componentDidMount() {
    this.fetchHouseplantOfTheDay();
 }

 
  async fetchHouseplantOfTheDay() {
    const randomHouseplantResponse = await fetch(`/api/plant_of_the_day`);
    const randomHouseplantJson = await randomHouseplantResponse.json();

    for (const randomPlant of Object.entries(randomHouseplantJson)) {

        const plantOfTheDay = {
            randomHouseplantId: randomPlant[1]['common_houseplant_id'],
            randomHouseplantPhotoUrl: randomPlant[1]['common_houseplant_photo_url'],
            randomCommonName: randomPlant[1]['common_name'],
            randomLatinName: randomPlant[1]['latin_name'],
            randomGeneralDescription: randomPlant[1]['general_description'],
            randomRecommendedLightRequirements: randomPlant[1]['light_requirements'],
        }
        this.setState({
          randomPlantOfTheDay: plantOfTheDay,
      });
    };
}


  renderPlantOfTheDay() {
    const plantOfTheDayInfo = []
                
      plantOfTheDayInfo.push(
          <div key={this.state.randomPlantOfTheDay['randomCommonName']}>
              <img src={this.state.randomPlantOfTheDay['randomHouseplantPhotoUrl']}></img>
              <h5>Common Name:</h5> 
              <p>{this.state.randomPlantOfTheDay['randomCommonName']}</p>
              <h5>Latin Name:</h5>
              <p>{this.state.randomPlantOfTheDay['randomLatinName']}</p>
              <h5>Light Requirement:</h5>
              <p>{this.state.randomPlantOfTheDay['randomRecommendedLightRequirements']}</p>
              <h5>General Description:</h5>
              <p>{this.state.randomPlantOfTheDay['randomGeneralDescription']}</p>
          </div>
    )
    return plantOfTheDayInfo     
  }


  getRandomHouseplant() {
    if (this.state.randomPlantOfTheDay !== null) {
      return (this.renderPlantOfTheDay())
    }
  }


    render() {
    return (
      <div>
      <div id="homepage" className="homepage">
        <h3>Plant of the Moment</h3>
        {this.getRandomHouseplant()}
        <div className="container">my container</div>
      </div>
      <div className="container">my second container</div>
      </div>
    );
    }
  } 