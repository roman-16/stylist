import React from 'react';
import BlueWorldSearch from '.';

export default {
  title: 'Widgets/BlueWorldSearch',
};

export const Default = () => (
  <div className="oc-wrapper">
    <div id="oc-pusher" className="oc-pusher oc-animation">
      <div id="page">
        <section className="container">
          <div id="process-wire-wrapper">
            <div className="s-blue-world">
              <div className="c-bw-navigationContainer o-container">
                <div className="c-bw-navigationRow o-row">
                  <nav className="c-bw-navigation">
                    <ul className="c-bw-navigation__list">
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--active c-bw-navigation__item--link">
                          Snowboard
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Freeski
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Skate
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Surf
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Events
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Products
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Team
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Parks
                        </a>
                      </li>
                      <li className="c-bw-navigation__item">
                        <a href="##" className="c-bw-navigation__item--link">
                          Win
                        </a>
                      </li>
                      <li className="c-bw-navigation__item c-bw-no-js">
                        <button
                          type="button"
                          id="c-bw-search-button"
                          className="c-bw-navigation__item--field c-bw-navigation__item--link track-click"
                          data-action="click-navigation"
                          data-category="blue-world"
                          data-label="search"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="c-bw-navigation__item__search__icon"
                            fill="#0099cc"
                            height="20px"
                            viewBox="0 0 22 25"
                          >
                            <path
                              // eslint-disable-next-line max-len
                              d="M2.2 8.985c0-3.755 3.092-6.811 6.893-6.811 3.8 0 6.892 3.056 6.892 6.81 0 3.756-3.091 6.812-6.892 6.812-3.8 0-6.893-3.056-6.893-6.811zm18.984 14.36l-6.311-7.43c2.022-1.65 3.312-4.145 3.312-6.93C18.185 4.03 14.107 0 9.093 0S0 4.03 0 8.985c0 4.954 4.079 8.984 9.093 8.984a9.11 9.11 0 0 0 3.903-.882l6.503 7.655 1.685-1.398z"
                              fillRule="nonzero"
                            />
                          </svg>
                          <span className="c-bw-navigation__item--placeholder">Search news</span>
                        </button>
                        <BlueWorldSearch />
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);
