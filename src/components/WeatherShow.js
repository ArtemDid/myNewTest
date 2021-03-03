import React from 'react';
import Card from './Cart';


class WeekContainer extends React.Component {
    state = {
        days: [],
        country: ""
    }
    weatherURL = "";
    str = "";
    ls = window.localStorage;


    componentDidMount(e) {
        fetch(this.weatherURL)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"))
                this.setState({ days: dailyData })
                this.setState({ country: this.str })
            })
            .catch(() => {
                console.log("Not found")
                this.setState({ country: "Not found" })
            })
    }

    getCarts() {
        return this.state.days.map((day, index) => <Card day={day} key={index} />)
    }

    changeUrl(event) {
        this.str = event.target.value;
        this.weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.str}&lang=ru&units=metric&APPID=c613fefb1e0ac8b53a96445b5bc013b5`;
        if (this.ls != undefined) {
            this.ls.setItem("country", this.str);
        }
    }

    render() {
        if (this.ls.length > 0) {
            this.weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${localStorage.getItem(Object.keys(localStorage))}&lang=ru&units=metric&APPID=c613fefb1e0ac8b53a96445b5bc013b5`;
            this.str = localStorage.getItem(Object.keys(localStorage));
        }
        return (
            <div>
                <h1 className="display-4 jumbotron">Прогноз погоды на 5 дней в 15:00</h1>
                <div className="d-flex justify-content-center"  >
                    <div className="p-2 bg-primary align-self-center">
                        <input type="text" style={{ height: "40px" }} placeholder="Enter country here..." onChange={(event) => this.changeUrl(event)}></input>
                    </div>
                    <div className="p-2 bg-primary">
                        <button className="btn btn-dark btn-outline-light" style={{ width: "150px", height: "40px" }} onClick={(e) => this.componentDidMount(e)}>Get Weather</button>
                    </div>
                </div>
                <h5 className="display-4 text-muted">{this.state.country}</h5>
                <div className="row justify-content-center">
                    {this.getCarts()}
                </div>
            </div>
        )
    }
}

export default WeekContainer