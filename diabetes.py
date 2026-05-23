import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC, SVR
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, mean_squared_error, classification_report, roc_auc_score

def main():
    try:
        # Step 1: Load the Kaggle Diabetes dataset
        print("Loading dataset...")
        data = pd.read_csv(r'C:\Users\ZEESHAN\Desktop\zeesannnnnnnn\dataset\diabetes.csv')  # Replace with the correct path to your dataset
        print("Dataset loaded successfully.\n")

        # Display dataset columns and first few rows
        print("Dataset Columns:", data.columns)
        print(data.head())

        # Step 2: Data Preprocessing
        # Assume the dataset has the following structure:
        # Features: 'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        # Target: 'Outcome' (0 = No Diabetes, 1 = Diabetes)
        features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
        target_classification = 'Outcome'  # Binary target for classification
        target_regression = 'Glucose'  # Continuous target for regression (example)

        X = data[features]
        y_classification = data[target_classification]
        y_regression = data[target_regression]

        # Split the dataset
        X_train_classification, X_test_classification, y_train_classification, y_test_classification = train_test_split(
            X, y_classification, test_size=0.2, random_state=42
        )
        X_train_regression, X_test_regression, y_train_regression, y_test_regression = train_test_split(
            X, y_regression, test_size=0.2, random_state=42
        )

        # Standardize features for models that require scaling
        scaler = StandardScaler()
        X_train_classification = scaler.fit_transform(X_train_classification)
        X_test_classification = scaler.transform(X_test_classification)
        X_train_regression = scaler.fit_transform(X_train_regression)
        X_test_regression = scaler.transform(X_test_regression)

        print("Data preprocessing complete.\n")

        # Step 3: Predict Diabetes (Classification)
        print("Running classification models for Diabetes prediction...\n")
        classification_models = {
            "Naive Bayes": GaussianNB(),
            "Logistic Regression": LogisticRegression(),
            "SVM": SVC(probability=True),
            "Decision Tree": DecisionTreeClassifier(),
            "Random Forest": RandomForestClassifier()
        }

        for name, model in classification_models.items():
            model.fit(X_train_classification, y_train_classification)
            y_pred = model.predict(X_test_classification)
            print(f"{name}:")
            print(f"Accuracy: {accuracy_score(y_test_classification, y_pred):.4f}")
            print(f"Classification Report:\n{classification_report(y_test_classification, y_pred)}")
            if hasattr(model, "predict_proba"):
                roc_auc = roc_auc_score(y_test_classification, model.predict_proba(X_test_classification)[:, 1])
                print(f"ROC-AUC: {roc_auc:.4f}")
            print("-" * 50)

        # Step 4: Predict Glucose Levels (Regression)
        print("Running regression models for Glucose prediction...\n")
        regression_models = {
            "Linear Regression": LinearRegression(),
            "Decision Tree": DecisionTreeRegressor(),
            "Random Forest": RandomForestRegressor(),
            "SVR": SVR()
        }

        for name, model in regression_models.items():
            model.fit(X_train_regression, y_train_regression)
            y_pred = model.predict(X_test_regression)
            mse = mean_squared_error(y_test_regression, y_pred)
            print(f"{name}:")
            print(f"Mean Squared Error: {mse:.2f}")
            print("-" * 50)

        print("Program executed successfully.")

    except FileNotFoundError:
        print("Error: Dataset file not found. Please ensure the file is in the specified path.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Entry point for the script
if __name__ == "__main__":
    main()
