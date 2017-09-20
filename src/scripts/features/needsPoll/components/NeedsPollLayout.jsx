import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import {
    Button,
    Grid,
    Segment,
    Input,
    Form,
    Header,
    Container,
    Message,
    Progress,
    Label,
    Divider,
    Modal
} from "semantic-ui-react";

import NeedForm from "./NeedForm.jsx";

import Need from "./Need.jsx";

import EditNeed from "./EditNeed.jsx";

export default class NeedsPollLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorLoadingNeeds: false,
            successAddingNeed: false,
            editingNeed: false,
            updatedNeed: false,
            errorUpdatingNeed: false,
            needRemovalPrompt: false,
            errorRemovingNeed: false,
            fetchNeeds: false,
            fetchedNeeds: false,
            fetchedShelter: false,
            fetchedUser: false,
            currentShelterCookie: null,
            description: false
        };
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.currentShelter) {
                this.props.actions.fetchShelter(this.props.user.currentShelter);
            }
        }
    }

    componentDidMount() {


        // if (!this.props.user && this.state.currentShelterCookie) {
        //     this.props.actions.fetchShelter(this.state.currentShelterCookie);
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editingNeed) {
            this.state.editingNeed = true;
        }

        if (nextProps.updatedNeed && !this.state.updatedNeed) {
            this.handleMessage(true, "updatingNeed");
        }

        if (nextProps.errorUpdatingNeed && !this.state.errorUpdatingNeed) {
            this.handleMessage(false, "updatingNeed");
        }

        if (nextProps.needRemovalPrompt) {
            this.handleMessage(null, "removingNeed");
        } else {
            this.state.needRemovalPrompt = false;
        }

        if (nextProps.errorRemovingNeed) {
            this.handleMessage(false, "errorRemovingNeed");
        }

        if (this.state.fetchedShelter && nextProps.shelterr) {
            this.state.fetchedNeeds = true;
            this.sttae.fetchedShelter = false;
            this.props.actions.fetchNeeds(nexProps.shelter._id);
        }

        if (nextProps.user && !this.state.fetchedShelter) {
            console.log(nextProps.user)
            if (nextProps.user.currentShelter) {
                this.state.fetchedShelter = true;
                this.state.fetchedNeeds = false;
                this.props.actions.fetchShelter(nextProps.user.currentShelter);
            }
        }

        // if (!this.props.user && nextProps.user) {
        //     this.state.fetchedNeeds = false;
        //     this.props.actions.getEntireUser(nextProps.user._id);
        // }

        // if (nextProps.user) {
        //     if (!this.state.fetchedUser) {
        //         if (nextProps.user._id) {
        //             this.props.actions.getEntireUser(nextProps.user._id);
        //             this.state.fetchedUser = true;
        //         }
        //     }

        //     if (!this.props.fullUser && nextProps.fullUser) {
        //         this.props.actions.fetchShelter(
        //             nextProps.fullUser.currentShelter
        //         );
        //         this.state.fetchedShelter = true;
        //     }

        //     if (nextProps.fullUser) {
        //         if (
        //             nextProps.fullUser.currentShelter &&
        //             nextProps.currentShelterId &&
        //             !this.state.fetchedNeeds
        //         ) {
        //             this.props.actions.fetchNeeds(nextProps.currentShelterId);
        //             this.state.fetchedNeeds = true;
        //         }
        //     }
        // } else {
        //     if (!nextProps.shelter && this.state.currentShelterCookie) {
        //         this.props.actions.fetchShelter(
        //             this.state.currentShelterCookie
        //         );
        //     }
        //     if (!this.state.fetchedNeeds && nextProps.shelter) {
        //         var notLoggedIn = true;
        //         this.props.actions.fetchNeeds(
        //             this.state.currentShelterCookie,
        //             notLoggedIn
        //         );
        //         this.state.fetchedNeeds = true;
        //     }
        // }
        // console.log(this.props.user);
        // console.log(this.props.fullUser, nextProps.fullUser);
        // if (this.props.fullUser && nexProps.fullUser) {
        //     console.log(this.props.fullUser, nexProps.fullUser);
        //     if (this.props.fullUser._id != nextProps.fullUser._id) {
        //         this.state.fetchedNeeds = false;
        //         this.state.fetchedShelter = false;
        //         this.state.fetchedUser = false;
        //     }
        // }
    }

    handleMessage(success, type) {
        if (type === "addingNeed") {
            if (success === true) {
                this.state.successAddingNeed = true;

                this.state.successAddingNeed = setTimeout(() => {
                    this.props.actions.resetStatus("addingNeed");
                    this.setState({ successAddingNeed: false });
                }, 5000);
            }
        }

        if (type === "loadingNeeds") {
            if (success === false) {
                this.state.errorLoadingNeeds = true;
            }
        }

        if (type === "updatingNeed") {
            if (success === true) {
                this.state.updatedNeed = true;
                this.state.errorUpdatingNeed = false;

                this.state.updatedNeed = setTimeout(() => {
                    this.props.actions.resetStatus("updatingNeed");
                    this.setState({ updatedNeed: false });
                }, 5000);
            } else {
                this.state.updatedNeed = false;
                this.state.errorUpdatingNeed = true;

                this.state.errorUpdatingNeed = setTimeout(() => {
                    this.props.actions.resetStatus("updatingNeed");
                    this.setState({ errorUpdatingNeed: false });
                }, 5000);
            }
        }

        if (type === "removingNeed") {
            this.state.needRemovalPrompt = true;
        }

        if (type === "errorRemovingNeed") {
            this.state.errorRemovingNeed;
            this.state.errorRemovingNeed = setTimeout(() => {
                this.props.actions.resetStatus("removingNeed");
                this.setState({ errorRemovingNeed: false });
            }, 5000);
        }
    }

    renderNeeds() {
        var arrayOfNeedElements = [];

        if (this.props.arrayOfNeeds) {
            for (var i = 0; i < this.props.arrayOfNeeds.length; i++) {
                arrayOfNeedElements.push(
                    <Need
                        isPreview={false}
                        updateNeed={this.props.actions.updateNeed.bind(this)}
                        removeNeed={this.props.actions.removeNeed.bind(this)}
                        nameOfNeed={
                            this.props.arrayOfNeeds[i].attributes.nameOfNeed
                        }
                        degreeOfNeed={
                            this.props.arrayOfNeeds[i].attributes.degreeOfNeed
                        }
                        numberOfPeople={
                            this.props.arrayOfNeeds[i].attributes.numberOfPeople
                        }
                        description={
                            this.props.arrayOfNeeds[i].attributes.description
                        }
                        idOfNeed={this.props.arrayOfNeeds[i].attributes._id}
                        idOfUpdatedNeed={this.props.idOfUpdatedNeed}
                        collectionOfNeeds={this.props.collectionOfNeeds}
                        editNeed={this.props.actions.editNeed.bind(this)}
                        errorUpdatingNeed={this.props.errorUpdatingNeed}
                        updatedNeed={this.props.updatedNeed}
                        resetStatus={this.props.actions.resetStatus.bind(this)}
                        errorRemovingNeed={this.props.errorRemovingNeed}
                    />
                );

                if (i != this.props.arrayOfNeeds.length - 1) {
                    arrayOfNeedElements.push(<Divider />);
                }
            }

            return arrayOfNeedElements;
        } else {
            return null;
        }
    }

    render() {
        const asyncNeeds = this.props.loadingNeeds || this.props.addingNeed
            ? true
            : false;

        const {
            errorLoadingNeeds,
            addedNeed,
            errorAddingNeed,
            editingNeed,
            updatedNeed,
            errorUpdatingNeed,
            collectionOfNeeds,
            idOfEditedNeed,
            idOfUpdatedNeed,
            idOfNeedToRemove,
            errorRemovingNeed
        } = this.props;

        if (errorLoadingNeeds) {
            this.handleMessage(false, "loadingNeeds");
        }
        if (editingNeed) {
            var model = this.props.collectionOfNeeds.get(idOfEditedNeed);
        }

        return this.props.shelter
            ? <Grid container columns="equal" stackable>
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Segment compact size="huge" textAlign="center">
                              <Header size="huge">
                                  {this.props.shelter.nameOfItem}

                              </Header>

                              <Header.Subheader>
                                  {this.props.shelter.place.name}
                                  <Divider />
                                  {this.props.shelter.place.formatted_address}
                              </Header.Subheader>
                              <Segment compact attached="top">
                                  <Button
                                      type="button"
                                      onClick={e => {
                                          e.preventDefault();
                                          if (
                                              this.state.description === false
                                          ) {
                                              this.setState({
                                                  description: true
                                              });
                                          } else {
                                              this.setState({
                                                  description: false
                                              });
                                          }
                                      }}
                                      basic
                                      size="tiny"
                                      icon={
                                          this.state.description
                                              ? "minus"
                                              : "add"
                                      }
                                  /> description
                              </Segment>

                              <Segment attached="bottom" size="small">

                                  {this.state.description
                                      ? <Container fluid text textAlign="left">
                                            {this.props.shelter.description}
                                        </Container>
                                      : null}
                              </Segment>
                          </Segment>

                          <Segment attached="bottom">
                              {true
                                  ? <Segment compact loading={asyncNeeds}>
                                        <NeedForm
                                            currentShelterId={
                                                this.props.currentShelterId
                                            }
                                            resetStatus={this.props.actions.resetStatus.bind(
                                                this
                                            )}
                                            errorAddingNeed={
                                                this.props.errorAddingNeed
                                            }
                                            addedNeed={this.props.addedNeed}
                                            doThisOnSubmit={userInput => {
                                                if (userInput) {
                                                    this.props.actions.submitNewNeed(
                                                        userInput,
                                                        "some_ID",
                                                        this.props
                                                            .collectionOfNeeds,
                                                        this.props
                                                            .currentShelterId
                                                    );
                                                }
                                            }}
                                        />
                                        {this.state.successAddingNeed
                                            ? <Message positive>
                                                  added need!
                                              </Message>
                                            : null}

                                    </Segment>
                                  : null}
                              <Segment secondary as={Grid} columns={3} streched>
                                  <Grid.Column textAlign="left">
                                      not enough
                                  </Grid.Column>
                                  <Grid.Column textAlign="center">
                                      running low
                                  </Grid.Column>
                                  <Grid.Column textAlign="right">
                                      plenty
                                  </Grid.Column>
                              </Segment>
                              <Segment basic loading={asyncNeeds}>

                                  {this.state.errorLoadingNeeds
                                      ? <Message negative>
                                            internal server error
                                        </Message>
                                      : this.renderNeeds()}

                                  <Modal
                                      open={this.props.editingNeed}
                                      size="huge"
                                  >
                                      <Segment>
                                          <Button
                                              type="button"
                                              floated="right"
                                              icon="remove"
                                              onClick={() => {
                                                  this.props.actions.editNeed(
                                                      "",
                                                      true
                                                  );
                                              }}
                                          />
                                      </Segment>
                                      <Modal.Content>

                                          <Grid columns={2} as={Segment} basic>
                                              <Grid.Column width={9}>
                                                  <EditNeed
                                                      needsCollection={
                                                          collectionOfNeeds
                                                      }
                                                      idOfEditedNeed={
                                                          this.props
                                                              .idOfEditedNeed
                                                      }
                                                      updateNeed={this.props.actions.updateNeed.bind(
                                                          this
                                                      )}
                                                  />
                                              </Grid.Column>
                                              <Grid.Column width={7}>
                                                  <Need
                                                      isPreview={true}
                                                      description={
                                                          editingNeed
                                                              ? model.get(
                                                                    "description"
                                                                )
                                                              : null
                                                      }
                                                      nameOfNeed={
                                                          editingNeed
                                                              ? model.get(
                                                                    "nameOfNeed"
                                                                )
                                                              : null
                                                      }
                                                      degreeOfNeed={
                                                          editingNeed
                                                              ? model.get(
                                                                    "degreeOfNeed"
                                                                )
                                                              : null
                                                      }
                                                      numberOfPeople={
                                                          editingNeed
                                                              ? model.get(
                                                                    "numberOfPeople"
                                                                )
                                                              : null
                                                      }
                                                      idOfNeed={idOfEditedNeed}
                                                      collectionOfNeeds={
                                                          this.props
                                                              .collectionOfNeeds
                                                      }
                                                  />
                                                  {this.state.updatedNeed
                                                      ? <Message positive>
                                                            updated successfully
                                                        </Message>
                                                      : null}
                                                  {this.state.errorUpdatingNeed
                                                      ? <Message negative>
                                                            something went wrong
                                                        </Message>
                                                      : null}
                                              </Grid.Column>

                                          </Grid>

                                      </Modal.Content>
                                  </Modal>

                                  <Modal open={this.state.needRemovalPrompt}>
                                      <Button
                                          icon="close"
                                          basic
                                          floated="right"
                                          onClick={() => {
                                              this.props.actions.resetStatus(
                                                  "removingNeed"
                                              );
                                          }}
                                      />

                                      <Modal.Header>
                                          are you sure you want to delete this item?
                                      </Modal.Header>
                                      <Modal.Content>

                                          <Button
                                              onClick={() => {
                                                  this.props.actions.resetStatus(
                                                      "removingNeed"
                                                  );
                                              }}
                                              positive
                                          >
                                              no
                                          </Button>

                                          <Button
                                              onClick={() => {
                                                  this.props.actions.removeNeed(
                                                      idOfNeedToRemove,
                                                      collectionOfNeeds,
                                                      false
                                                  );
                                              }}
                                              negative
                                          >
                                              yes
                                          </Button>

                                          {this.props.errorRemovingNeed
                                              ? <Message negative>
                                                    something went wrong
                                                </Message>
                                              : null}

                                      </Modal.Content>

                                  </Modal>

                              </Segment>

                          </Segment>

                      </Grid.Column>

                      <Grid.Column />

                  </Grid.Row>

                  <Grid.Row>

                      <Grid.Column>
                          <Header
                              attached="top"
                              size="large"
                              textAlign="center"
                          />
                          <Segment attached />

                      </Grid.Column>

                  </Grid.Row>
              </Grid>
            : <div>click here to view shelters</div>;
    }
}
