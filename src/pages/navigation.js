import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AdminPanelLayout from '@/components/AdminPanelLayout';
import axios from 'axios';
import styles from '../styles/AdminPanelLayout.module.css';
import ErrorMessage from '@/components/ErrorMessage';


const Navigation = () => {
  const [navigation, setNavigation] = useState(null);
  const [isAddNavigationFormOpen, setIsAddNavigationFormOpen] = useState(false);
  const [newNavigationInputs, setNewNavigationInputs] = useState({
    linkName: "",
    linkURL: "",
    openLinkInNewTab: false,
    linkType: "",
    linkPosition: "",
    subLinkOf: "",
  });
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/fetchNavigation') // Use the relative path to your API route
      .then((res) => setNavigation(res.data))
      .catch((err) => console.log(err));
  }, []);

  const openAddNavigationForm = () => {
    setIsAddNavigationFormOpen(true);
  };

  const closeAddNavigationForm = () => {
    setNewNavigationInputs({
      linkName: "",
      linkURL: "",
      openLinkInNewTab: false,
      linkType: "",
      linkPosition: "",
      subLinkOf: "",
    });
    setIsAddNavigationFormOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;

    setNewNavigationInputs((prevInputs) => {
      if (type === "checkbox") {
        return {
          ...prevInputs,
          [name]: checked,
        };
      }

      return {
        ...prevInputs,
        [name]: value,
      };
    });
  };

  const handlAddNavigationForm = async (event) => {
    event.preventDefault();

    // Define validation rules (e.g., linkName is mandatory)
    let error = null;
    if (!newNavigationInputs.linkName) {
      error = "Link Name is required";
    }
    else if (!newNavigationInputs.linkURL) {
      error = "Link URL is required";
    }
    else if (!newNavigationInputs.linkType) {
      error = "Link Type is required";
    }
    else if (!newNavigationInputs.linkPosition) {
      error = "Link Position is required";
    }
    else if (newNavigationInputs.linkType === "sub" && !newNavigationInputs.subLinkOf) {
      error = "Sub Link Of is required";
    }

    // If there are validation errors, display them and return
    if (error) {
      setShowError({
        title: "Validation Error",
        description: error
      });
      return;
    }

    // If validation passes, make an API call to add navigation
    try {
      const response = await axios.post('/api/addNavigation', newNavigationInputs);
      if (response.status === 200) {
        // Navigation added successfully
        // You can update the local state or perform any other action
        // For example, refresh the navigation data:
        // fetchData();
        // Clear the form inputs
        setNewNavigationInputs({
          linkName: "",
          linkURL: "",
          openLinkInNewTab: false,
          linkType: "",
          linkPosition: "",
          subLinkOf: "",
        });
        // Close the form
        setIsAddNavigationFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding navigation:', error);
      setShowError({
        title: "Error",
        description: "Failed to add navigation. Please try again later.",
      });
    }
  };


  return (
    <>
      <AdminPanelLayout>
        {/* NAVIGATION LINKS SECTION START HERE */}
        {
          navigation &&
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", padding: "1rem", marginBottom: "3rem" }}>
            <Typography variant="body1">
              Current Navigation Links:
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>Open New</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Sub Of</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {navigation.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.linkPosition}</TableCell>
                      <TableCell>{row.linkName}</TableCell>
                      <TableCell>{row.linkURL}</TableCell>
                      <TableCell>{row.openLinkInNewTab ? "Yes" : "No"}</TableCell>
                      <TableCell>{row.linkType}</TableCell>
                      <TableCell>{row.subLinkOf || "--/--"}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary">
                          EDIT
                        </Button> &nbsp;
                        <Button variant="contained" color="secondary">
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }

        <div className={styles.navigationComponents}>
          <div className={styles.newMenuAddSection}>
            {
              !isAddNavigationFormOpen ?
                <>
                  <Typography variant="body1">
                    Click on the "Add a Navigation" button to add a new navigation link.
                  </Typography>
                  <Button className={styles.addNavigation} onClick={openAddNavigationForm}>
                    ADD A NAVIGATION
                  </Button>
                </>
                :
                <>
                  <Typography variant="body1">
                    Add Navigation Link
                  </Typography>
                  <br />
                  <form onSubmit={handlAddNavigationForm} className={styles.form}>
                    <label htmlFor="linkName" className={styles.label}>Link Name:</label>
                    <TextField
                      type="text"
                      name="linkName"
                      id="linkName"
                      className={styles.input}
                      value={newNavigationInputs.linkName}
                      onChange={handleFormChange}
                    />

                    <label htmlFor="href" className={styles.label}>Link URL:</label>
                    <TextField
                      type="text"
                      name="linkURL"
                      id="href"
                      className={styles.input}
                      value={newNavigationInputs.linkURL}
                      onChange={handleFormChange}
                    />

                    <div className={styles.checkboxMain}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="openLinkInNewTab"
                            id="openNewWindow"
                            className={styles.checkbox}
                            checked={newNavigationInputs.openLinkInNewTab}
                            onChange={handleFormChange}
                          />
                        }
                        label="Open in new window"
                        className={styles.checkboxLabel}
                      />
                    </div>

                    <label htmlFor="type" className={styles.label}>Link Type:</label>
                    <Select
                      label="Type"
                      name="linkType"
                      id="type"
                      className={styles.select}
                      value={newNavigationInputs.linkType}
                      onChange={handleFormChange}
                    >
                      <MenuItem value="main">Main</MenuItem>
                      <MenuItem value="sub">Sub</MenuItem>
                    </Select>

                    <label htmlFor="position" className={styles.label}>Link Position:</label>
                    <TextField
                      type="number"
                      name="linkPosition"
                      id="position"
                      className={styles.input}
                      value={newNavigationInputs.linkPosition}
                      onChange={handleFormChange}
                    />

                    {newNavigationInputs.linkType === "sub" && (
                      <>
                        <label htmlFor="subOf" className={styles.label}>Sub Link Of:</label>
                        <Select
                          label="Sub Of"
                          name="subLinkOf"
                          id="subOf"
                          className={styles.select}
                          value={newNavigationInputs.subLinkOf}
                          onChange={handleFormChange}
                        >
                          <MenuItem value="home">Home</MenuItem>
                          <MenuItem value="about">About</MenuItem>
                          <MenuItem value="contact">Contact</MenuItem>
                        </Select>
                      </>
                    )}

                    {
                      showError &&
                      <ErrorMessage title={showError.title} message={showError.description} />
                    }

                    <div className={styles.addNavigationCTAs}>
                      <Button className={styles.addNavigationCTASubmit} variant="contained" type='submit' color="primary">Submit</Button>
                      <Button className={styles.addNavigationCTACancel} onClick={closeAddNavigationForm}>Cancel</Button>
                    </div>

                  </form>

                </>
            }
          </div>
        </div>
      </AdminPanelLayout>
      {/* NAVIGATION LINKS SECTION END HERE */}
    </>
  );
};

export default Navigation;