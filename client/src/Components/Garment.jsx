import React, { Component } from 'react'
import Popup from "reactjs-popup";
import axios from 'axios'

 class Garment extends Component {
    state = {
        user: this.props.user,
        garment: {},
        location: '',
        body: '',
        image_url: '',
        isPublic: true,
        historyPosts: []
    }

    componentDidMount = () => {
        this.getGarment()
        this.getHistory()
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    getGarment = async () => {
        const { routeprops: { match:{ params } } } = this.props;
        const URL = `/api/garments/garment/${params.id}`
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                garment: results.data.payload[0]
            })
        } catch (err) {
            console.log(err)
        }
    }

    getHistory = async () => {
        const { routeprops: { match:{ params } } } = this.props;
        const URL = `/api/histories/garment/${params.id}`
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                historyPosts: results.data.payload
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleHistorySubmit = async (e) => {
        e.preventDefault()
        const { user, body, location, image_url, isPublic } = this.state
        const { routeprops: { match:{ params } } } = this.props;
        const URL = `/api/histories/new/${params.id}/${user.id}`;

        const data = {
            body: body,
            location: location,
            imageUrl: image_url,
            isPublic: isPublic
        }

        try {
            await axios.post(URL, data)
        } catch (err) {
            console.log(err)
        }
        this.getHistory()
    }

    render() {
        const { 
            garment, 
            historyPosts,
            body,
            location,
            img_url, 
        } = this.state
        let historyComponents = []
        historyPosts.forEach(history => {
            historyComponents.push(
                <div>
                    <img src={history.img_url} height='250px' />
                    <i>{history.location}</i><br/>
                    <p>{history.body}</p>
                </div>
            )
        })

        return (
            <div className='main'>
                <div>
                    <img src={garment.img_url} />
                    <h3>{garment.garment_name}</h3>
                    <p>{garment.caption}</p>
                    <img src={`http://api.qrserver.com/v1/create-qr-code/?data=https://handmedown.herokuapp.com/user/wardrobe/garment/${garment.id}&size=500x500`} alt={garment.garment_name} />
                </div>
                <nav className='garment-nav'>
                    <Popup trigger={<h4>Add A New Story</h4>} 
                        modal
                        position="right center">
                            <div className='history-form'>
                                <h3>Add A Story</h3>
                                <form onSubmit={this.handleHistorySubmit}>
                                    <b>Caption</b><br/>
                                    <textarea 
                                        name="body"
                                        value={body} 
                                        cols="42"
                                        onChange={this.handleChange} 
                                        placeholder="body"
                                    /><br/>
                                    <b>Image</b><br/>
                                    <input
                                        className='garment-input'
                                        type="text"
                                        name="img_url"
                                        value={img_url}
                                        placeholder="image url"
                                        onChange={this.handleChange}
                                    /><br/>
                                    <b>Location</b><br/>
                                    <input
                                        className='garment-input'
                                        type="text"
                                        name="location"
                                        value={location}
                                        placeholder="Location"
                                        onChange={this.handleChange}
                                    /><br/>
                                    <input type='submit' className='submit-button' value='Make Post' />
                                </form>
                            </div>
                        </Popup>
                </nav>
                <div className='history-container'>
                    {historyComponents}
                </div>
            </div>
        )
    }
}

export default Garment