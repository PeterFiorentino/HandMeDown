import React, { Component, Profiler } from 'react'
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom'
import axios from 'axios'

class Wardrobe extends Component {
    state = {
        garments: [],
        garment_name: '',
        category: '',
        caption: '',
        img_url: '',
        prime_location: '',
        username: '',
        password: '',
        avatar_url: '',
        email: ''
    }

    componentDidMount = () => {
        this.getUserGarments()
    }

    getUserGarments = async () => {
        let { user } = this.props
        let URL = `/api/garments/garment/${user.id}`
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                garments: results.data.payload
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleGarmentSubmit = async (e) => {
        e.preventDefault()
        let { user } = this.props
        let { garment_name, caption, category, img_url, prime_location } = this.state
        let URL = `/api/garments/user/${user.id}`
        let data = {
            garment_name: garment_name,
            category: category,
            caption: caption,
            img_url: img_url,
            prime_location: prime_location
        }
        try {
            await axios.post(URL, data)
        } catch (err) {
            console.log(err)
        }
        this.getUserGarments()
    }

    render () {
        const { user } = this.props;
        const { 
            garments, 
            garment_name, 
            category, 
            caption, 
            img_url, 
            prime_location,
            username,
            avatar_url,
            password,
            email
        } = this.state;

        const garmentComponents = [];
        garments.forEach(garment => {
            garmentComponents.push(
                <Link to={`/user/wardrobe/garment/${garment.id}`}>
                    <div className='garment'>
                        <img src={garment.img_url}/>
                        <div>
                            <h3>{garment.garment_name}</h3>
                            {garment.prime_location}
                        </div>
                        
                        {/* <p>{garment.category}</p>
                        <p>{garment.caption}</p> */}
                    </div>
                </Link>
            )
        });
        return (
            <div className='wardrobe-main'>
                <div className='header'>
                    <div className='user'>
                        <img className='avatar' src={user.avatar_url} />
                        <h1>{user.username}'s Wardrobe</h1>
                    </div>
                    
                    
                    <nav className='garment-nav'>
                        <Popup trigger={<h4>Add A New Garment</h4>} 
                        modal
                        position="right center">
                            <div className='garment-form'>
                                <h3>Add New Garment</h3>
                                <form onSubmit={this.handleGarmentSubmit}>
                                    <b>Name</b><br/>
                                    <input
                                        className='garment-input'
                                        type="text"
                                        name="garment_name"
                                        value={garment_name}
                                        placeholder="Garment Name"
                                        onChange={this.handleChange}
                                    /><br/>
                                    <b>Category</b><br/>
                                    <input
                                        className='garment-input'
                                        type="text"
                                        name="category"
                                        value={category}
                                        placeholder="Category"
                                        onChange={this.handleChange}
                                    /><br/>
                                    <b>Caption</b><br/>
                                    <textarea 
                                        name="caption"
                                        value={caption} 
                                        cols="42"
                                        onChange={this.handleChange} 
                                        placeholder="Caption"
                                    /><br/>
                                    <b>Garment Image</b><br/>
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
                                        name="prime_location"
                                        value={prime_location}
                                        placeholder="Location"
                                        onChange={this.handleChange}
                                    /><br/>
                                    <input type='submit' className='submit-button' value='Add Garment' />
                                </form>
                            </div>
                        </Popup>
                        
                        <Popup trigger={<h4>Settings</h4>} 
                        modal
                        position="right center">
                            <div className='user-form'>
                                <h3>User Info</h3>
                                <b>Username</b><br/>
                                <form >
                                    <i class="fas fa-user"></i>{"  "}
                                    <input
                                      className='signup-input'
                                      type="text"
                                      name="username"
                                      value={username}
                                      placeholder="username"
                                      onChange={this.handleChange}
                                    /><br/>
                                    <b>Email</b><br/>
                                    <i class="fas fa-envelope"></i>{" "}
                                    <input
                                      className='signup-input'
                                      type="text"
                                      name="email"
                                      value={email}
                                      placeholder="email"
                                      onChange={this.handleChange}
                                    /><br/>
                                    
                                    <b>Password</b><br/>
                                    <i class="fas fa-lock"></i>{"  "}
                                    <input
                                      className='signup-input'
                                      type="password"
                                      name="password"
                                      value={password}
                                      placeholder="••••••••"
                                      onChange={this.handleChange}
                                    /><br/>
                                    
                                    <b>Avatar</b><br/>
                                    <i class="fas fa-image"></i>{"  "}
                                    <input
                                      className='signup-input'
                                      type="text"
                                      name="avatar_url"
                                      value={avatar_url}
                                      placeholder="Enter Avatar URL"
                                      onChange={this.handleChange}
                                    /><br/>
                                    <input type='submit' className='submit-button' value='submit' />
                                </form>
                            </div>
                        </Popup>
                        
                    </nav>
                </div>
                <div className='garments-container'>
                    {garmentComponents}
                </div>
            </div>
        )
    }
}

export default Wardrobe