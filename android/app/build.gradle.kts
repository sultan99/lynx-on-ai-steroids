plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.jetbrains.kotlin.android)
}

android {
  namespace = "com.lynxonaisteroids.app"
  compileSdk = 36

  defaultConfig {
    applicationId = "com.lynxonaisteroids.app"
    minSdk = 24
    targetSdk = 34
    versionCode = 1
    versionName = "1.0"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
    }
  }
  buildFeatures {
    buildConfig = true
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
  packaging {
    resources {
      excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
  }
}

dependencies {
  implementation(libs.androidx.core.ktx)

  // Lynx SDK core
  implementation("org.lynxsdk.lynx:lynx:3.6.0")
  implementation("org.lynxsdk.lynx:lynx-jssdk:3.6.0")
  implementation("org.lynxsdk.lynx:lynx-trace:3.6.0")
  implementation("org.lynxsdk.lynx:primjs:3.6.1")

  // Lynx image service + Fresco
  implementation("org.lynxsdk.lynx:lynx-service-image:3.6.0")
  implementation("com.facebook.fresco:fresco:2.3.0")
  implementation("com.facebook.fresco:animated-gif:2.3.0")
  implementation("com.facebook.fresco:animated-webp:2.3.0")
  implementation("com.facebook.fresco:webpsupport:2.3.0")
  implementation("com.facebook.fresco:animated-base:2.3.0")

  // Lynx log service
  implementation("org.lynxsdk.lynx:lynx-service-log:3.6.0")

  // Lynx HTTP service + OkHttp
  implementation("org.lynxsdk.lynx:lynx-service-http:3.6.0")
  implementation("com.squareup.okhttp3:okhttp:4.9.0")

  // Lynx XElement (extended native elements)
  implementation("org.lynxsdk.lynx:xelement:3.6.0")
  implementation("org.lynxsdk.lynx:xelement-input:3.6.0")

  // Lynx DevTools (debug only)
  debugImplementation("org.lynxsdk.lynx:lynx-devtool:3.6.0")
  debugImplementation("org.lynxsdk.lynx:lynx-service-devtool:3.6.0")
}
