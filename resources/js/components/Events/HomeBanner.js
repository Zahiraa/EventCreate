import React from 'react';

export default class HomeBanner extends React.Component {
    render() {
        return (
                <div>
                    <section className="home_banner_area" style={{ backgroundImage: `url(${this.props.pic})` }}>
                        <div className="banner_inner">
                            <div className="container">
                                <div className="banner_content">
                                    <p>{this.props.text}</p>
                                    <a className="banner_btn" href="/#welcome_area">View More Details</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
);
}
}

