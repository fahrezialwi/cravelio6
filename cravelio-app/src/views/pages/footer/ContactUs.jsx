import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class ContactUs extends Component {

    componentDidMount() {
        document.title = 'Contact Us - Cravelio'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row row-top row-bottom">
                        <div className="col-md-7">
                            <iframe
                                width="100%"
                                height="410"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=sinarmas%20msig%20tower&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                                title="gmaps"
                            >
                            </iframe>
                        </div>
                        <div className="col-md-5">
                            <h4>Contact Us</h4>
                            <form>
                                <input type="text" className="form-control mb-4"  name="name" placeholder="Name" required/>
                                <input type="email" className="form-control mb-4" name="email" placeholder="E-mail" required/>
                                <input type="text" className="form-control mb-4" name="subject" placeholder="Subject" required/>
                                <textarea name="message" className="form-control mb-4" placeholder="Your message" rows="8" required></textarea>
                                <button className="btn-main">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ContactUs