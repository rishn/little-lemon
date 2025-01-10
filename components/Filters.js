// Import necessary components and functions from React Native
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// The Filters component allows users to interact with a series of filter options.
// It takes props for handling filter changes, current selections, and the list of sections.
const Filters = ({ onChange, selections, sections }) => {
  return (
    // Main container for the filters with predefined styles.
    <View style={styles.filtersContainer}>
      {/* Map over the sections to render each filter option */}
      {sections.map((section, index) => (
        // TouchableOpacity makes each filter option clickable.
        <TouchableOpacity
          key={index}
          // Call the onChange function with the current index when an option is clicked.
          onPress={() => {
            onChange(index);
          }}
          // Dynamic styling to reflect the selected state of the filter.
          style={{
            flex: 1 / sections.length,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            backgroundColor: selections[index] ? "#495e57" : "#edefee",
            borderRadius: 9,
            marginRight: 15,
          }}
        >
          <View>
            {/* Display the section name with the first letter capitalized */}
            <Text
              style={{
                fontFamily: "Karla-ExtraBold",
                color: selections[index] ? "#edefee" : "#495e57",
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Define styles for the Filters component.
const styles = StyleSheet.create({
  // Style for the container holding the filter buttons.
  filtersContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 15,
  },
});

// Export the Filters component so it can be reused elsewhere.
export default Filters;
