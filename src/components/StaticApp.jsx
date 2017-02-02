import React, { Component } from "react";
import _ from "lodash";
import VideoPlayer from "./VideoPlayer.jsx";
import {
  NAME,
  TAGLINE,
  DESCRIPTION,
  KEYWORDS,
  AUTHORS,
} from "config/settings.js";

const ANALYTICS_CODE = `
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-80717786-3', 'auto');
  ga('send', 'pageview');
`;

class StaticApp extends Component {
  render() {
    const { locals: { stylesheets } } = this.props;

    return (
      <html>
        <head>
          <title>{NAME} — {TAGLINE}</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content={AUTHORS} />
          <meta name="keywords" content={KEYWORDS} />
          <meta name="description" content={DESCRIPTION} />
          <link href="/images/favicon.png" rel="shortcut icon" type="image/png" />

          {
            stylesheets.map((stylesheetPath) => {
              return (
                <link
                  key={stylesheetPath}
                  href={stylesheetPath}
                  rel="stylesheet" />
              );
            })
          }
        </head>
        <body>
          <div className="js-videoPlayer"><VideoPlayer /></div>
          <footer className="footerNote">
            <a
              className="footerNote-link"
              href="http://fandf.io/"
              target="_blank">Made by Form &amp; Function</a>
          </footer>

          <script type="text/javascript" src="/index.js"></script>
          <script dangerouslySetInnerHTML={{ __html: ANALYTICS_CODE }} />
        </body>
      </html>
    );
  }
}

export default StaticApp;
