import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

def main():
    try:
        # Step 1: Load the dataset
        print("Loading dataset...")
        data = pd.read_csv(r'C:\Users\Khawaja Zeeshan Ijaz\Desktop\protfolio\Salary_Data.csv')  # Replace with your dataset path
        print("Dataset loaded successfully.\n")
        
        # Display the first few rows of the dataset
        print("Dataset Preview:\n", data.head())
        print("\nDataset Summary:\n", data.describe())

        # Step 2: Data Preprocessing
        # Assuming the dataset has columns: 'YearsExperience', 'Age', 'EducationLevel', and 'Salary'
        if 'Salary' not in data.columns:
            raise ValueError("'Salary' column not found in the dataset.")

        # Select features and target
        features = ['YearsExperience', 'Age', 'EducationLevel']  # Adjust based on dataset structure
        target = 'Salary'

        # Encode categorical columns if necessary
        if 'EducationLevel' in data.columns:
            data = pd.get_dummies(data, columns=['EducationLevel'], drop_first=True)

        X = data.drop(columns=[target])
        y = data[target]

        # Split the dataset into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        print("Data split into training and testing sets.\n")

        # Step 3: Explore the data
        print("Performing exploratory data analysis...")
        plt.figure(figsize=(8, 6))
        sns.heatmap(data.corr(), annot=True, cmap='coolwarm', fmt=".2f")
        plt.title("Correlation Heatmap")
        plt.show()

        sns.pairplot(data)
        plt.show()

        print("EDA complete.\n")

        # Step 4: Train Regression Models
        print("Training regression models...\n")
        models = {
            "Linear Regression": LinearRegression(),
            "Decision Tree Regressor": DecisionTreeRegressor(),
            "Random Forest Regressor": RandomForestRegressor(n_estimators=100, random_state=42)
        }

        for name, model in models.items():
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)

            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            print(f"{name}:")
            print(f"Mean Squared Error: {mse:.2f}")
            print(f"R-squared: {r2:.4f}\n")
            print("-" * 50)

        # Step 5: Visualize Predictions
        print("Visualizing predictions from the best model (Random Forest Regressor)...\n")
        best_model = models["Random Forest Regressor"]
        y_pred_best = best_model.predict(X_test)

        plt.figure(figsize=(8, 6))
        plt.scatter(y_test, y_pred_best, alpha=0.7, color='blue')
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], color='red', linestyle='--')
        plt.title("Actual vs Predicted Salaries")
        plt.xlabel("Actual Salary")
        plt.ylabel("Predicted Salary")
        plt.grid()
        plt.show()

        print("Program executed successfully.")

    except FileNotFoundError:
        print("Error: Dataset file not found. Please ensure the file is in the specified path.")
    except ValueError as ve:
        print(ve)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Entry point for the script
if __name__ == "__main__":
    main()
