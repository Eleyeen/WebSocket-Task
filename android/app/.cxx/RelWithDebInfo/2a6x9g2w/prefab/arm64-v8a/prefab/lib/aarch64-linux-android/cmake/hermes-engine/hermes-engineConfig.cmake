if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/mac/.gradle/caches/8.8/transforms/e81ca27d20764305e37edae32c1e7a58/transformed/hermes-android-0.75.4-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/mac/.gradle/caches/8.8/transforms/e81ca27d20764305e37edae32c1e7a58/transformed/hermes-android-0.75.4-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

